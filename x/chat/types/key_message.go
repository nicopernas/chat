package types

import "encoding/binary"

var _ binary.ByteOrder

const (
	// MessageKeyPrefix is the prefix to retrieve all Message
	MessageKeyPrefix = "Message/value/"
)

// MessageKey returns the store key to retrieve a Message from the index fields
func MessageKey(
	messageId string,
) []byte {
	var key []byte

	messageIdBytes := []byte(messageId)
	key = append(key, messageIdBytes...)
	key = append(key, []byte("/")...)

	return key
}
