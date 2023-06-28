export {
  PublicKey,
  Field,
  Bool,
  AuthRequired,
  UInt8,
  UInt32,
  UInt64,
  Sign,
  TokenId,
};

type Field = string;
type Bool = boolean;
type UInt8 = string;
type UInt32 = string;
type UInt64 = string;
type PublicKey = string;
type Sign = 'Positive' | 'Negative';
type AuthRequired = 'Signature' | 'Proof' | 'Either' | 'None' | 'Impossible';
type TokenId = Field;
