package types

// ValidateBasic is used for validating the packet
func (p NewSpaceMessagePacketData) ValidateBasic() error {

	// TODO: Validate the packet data

	return nil
}

// GetBytes is a helper for serialising
func (p NewSpaceMessagePacketData) GetBytes() ([]byte, error) {
	var modulePacket ChatPacketData

	modulePacket.Packet = &ChatPacketData_NewSpaceMessagePacket{&p}

	return modulePacket.Marshal()
}
