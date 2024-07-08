export {
  PublicKey,
  Field,
  Bool,
  AuthRequired,
  UInt64,
  UInt32,
  Sign,
  TokenId,
  MayUseToken,
};

type Field = string;
type Bool = boolean;
type UInt64 = string;
type UInt32 = string;
type PublicKey = string;
type Sign = 'Positive' | 'Negative';
type AuthRequired = 'Signature' | 'Proof' | 'Either' | 'None' | 'Impossible';
type TokenId = Field;
type MayUseToken = {
  parentsOwnToken: Bool;
  inheritFromParent: Bool;
};
