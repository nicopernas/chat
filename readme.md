# The chat chain

This is a version of the chain explained in the [Interacting with other chains
using IBC and
relayers](https://www.youtube.com/watch?v=816PP8oXv0Q&ab_channel=Cosmos)
tutorial with some ideas from the [Cosmos
Academy](https://tutorials.cosmos.network/academy/1-what-is-cosmos). I used
`ignite v0.22.2` and `SDK v0.45.4` which are newer than the ones used in most
tutorials out there.

The chain is a chat app like any other. Users send messages and these are
stored in the chain. These are the main components:

- `chat/x/chat/keeper/msg_server_new_message.go`

This logic was built by me to fetch a new message id every time the user wants
to "send a message" and it stores it on the chain.  See the `NewMessage`
method.


- `chat/x/chat/keeper/msg_server_new_space_message.go`

A "space message" is a message to be sent to a remote chain (i.e. through IBC).
The code stores the message on the source chain, sends it to the remote chain
(via IBC) and it is stored there too.  The `SendNewSpaceMessage` is the one in
charge of a) storing the message on the local chain and b) wrap it up in an IBC
packet before sending it to the remote chain.

- `chat/x/chat/keeper/new_space_message.go`

This is auto-generated by ignite. It provides hooks for you to deal with some
of the IBC related steps. In my case, I only looked into the
`OnRecvNewSpaceMessagePacket` method, which is called by the SDK whenever an
IBC packet arrives. This is where the message is stored on the remote chain.


## ignite commands

These are the basic ignite commands to scaffold the chain. Note that I manually
added code to do the thing I wanted to do. For example, whenever a "new
message" request arrives, I wanted to store the message on chain. Ignite only
gives you a bit of plumbing and you have to do the rest. Similarly, when a "new
space message" request comes in (i.e. the user wants to send a message to a
remote chain) I had to add code to store the message on the source and remote
chain (see comments above)

Look at the git history to see exactly what files changed along the way.

```bash
$ ignite scaffold chain github.com/nicopernas/chat --no-module
$ ignite scaffold module chat --ibc
$ ignite scaffold map message creator body --module chat --index messageId --no-message
$ ignite scaffold message newMessage body --module chat --response messageId
$ ignite scaffold packet newSpaceMessage body user --module chat
```


## Start the chain locally


Start the chain, making sure you "force reset" the state on every source code
change. This ensure that while you are developing the chain is always rebuilt
and its height brought back to zero. Super useful to prevent mismatches between
code and storage.

```bash
$ ignite chain serve --force-reset
```

The `config.yml` file creates two fully funded accounts: alice and bob. We can
use those to send messages. The cosmos SDK also builds and installs a CLI tool
to talk to the chain called `chatd`

At the beginning, the chain's empty

```bash
$ chatd query chat list-message
message: []
pagination:
  next_key: null
    total: "0"
```

Send a couple of messages to check that everything's working.

```bash
$ chatd tx chat new-message 'Hi, I am Alice' --from $( chatd keys show alice -a ) --yes
...

$ chatd tx chat new-message 'Hi, I am Bob' --from $(chatd keys show bob -a ) --yes
...
```

List the messages again and you'll see the ones you just sent
```bash
$ chatd query chat list-message
message:
- body: Hi, I am Alice
  creator: cosmos18wrm3qkflfsvtctl4ht3lvw6v5n9uz3f9d0lrt
  messageId: "1"
- body: Hi, I am Bob
  creator: cosmos162j0fzfalux80c92766ytg0vf8ad09r4f0u0xf
  messageId: "2"
pagination:
  next_key: null
  total: "0"
```


## Send messages between multiple chains

The chains will run locally. These will be two instances of the same chain so
we need to have different "homes" for them and slightly different config. See
both [config1.yml](config1.yml) and [config2.yml](config2.yml) for details.

Note that we need to specify different `grpc-web` ports for both chains,
otherwise you'll get a "port already used" type of error. This is not mentioned
in any of the tutorials and took me a while to figure out.

You can now start two instances of the same chain. Run these on separate
sessions.

```bash
$ ignite chain serve --config config1.yml --force-reset
...
???? Tendermint node: http://0.0.0.0:26657
???? Blockchain API: http://0.0.0.0:1337


$ ignite chain serve --config config2.yml --force-reset
...
???? Tendermint node: http://0.0.0.0:36657
???? Blockchain API: http://0.0.0.0:2337
```

## ibc-setup commands

The IBC commands below are part of the
[ts-relayer](https://github.com/confio/ts-relayer) repo. Install the relayer
like so.

```bash
$ npm install -g @confio/relayer@main
```

We need to setup the IBC connection and channel between our local chains. These
commands do the trick.

Note that `--version chat-1` relates to the version used in
[keys.go](x/chat/types/keys.go).

```bash
$ ibc-setup init --src chat-1 --dest chat-2
...

$ ibc-setup connect -v
...
info: Connection open confirm: connection-0
Created connections connection-0 (07-tendermint-0) <=> connection-0 (07-tendermint-0)

$ ibc-setup channel -v \
  --src-connection connection-0 \
  --dest-connection connection-0 \
  --src-port chat \
  --dest-port chat \
  --version chat-1
...
Created channel:
  chat-1: chat/channel-0 (connection-0)
  chat-2: chat/channel-0 (connection-0)

$ ibc-relayer start -v
```


## E2E IBC test

First, check that both chains are "empty"

```bash
$ chatd query chat list-message --node tcp://localhost:26657
message: []
pagination:
  next_key: null
  total: "0"

$ chatd query chat list-message --node tcp://localhost:36657
message: []
pagination:
  next_key: null
  total: "0"

```

Send a "space message" to chain-1. This is the type of messages that our chain
relays to the remote chain it's connected to

```bash
$ chatd tx chat send-new-space-message \
  chat channel-0 'hello world' $( chatd keys show alice -a --home ~/.chat-1 ) \
  --from alice \
  --yes \
  --chain-id chat-1 \
  --home ~/.chat-1 \
  --node tcp://localhost:26657
...

txhash: BDE824715CDA686D07F7FB97A67D37C9BEFA053DB95DCFEDE6D9A0E38A44FEA3
```

Verify the message is stored in the source chain but not on the remote. This
won't happen until the relayer runs, sees the pending tx and relays it to the
remote chain. The default configuration is to run once every 60s.

```bash
$ chatd query chat list-message --node tcp://localhost:26657
message:
- body: hello world
  creator: cosmos1h4m5xkylumduse0yv30ycu7pt3dff6400mu694
  messageId: "1"
pagination:
  next_key: null
  total: "0"

$ chatd query chat list-message --node tcp://localhost:36657
message: []
pagination:
  next_key: null
  total: "0"

$ sleep 60

$ chatd query chat list-message --node tcp://localhost:36657
message:
- body: hello world
  creator: cosmos1h4m5xkylumduse0yv30ycu7pt3dff6400mu694
  messageId: "1"
pagination:
  next_key: null
  total: "0"
```
