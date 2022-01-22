export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddTagInput = {
  value: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addTag?: Maybe<Scalars['String']>;
  privateContent?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<TokensOutput>;
  signIn?: Maybe<TokensOutput>;
  signOff?: Maybe<Scalars['Boolean']>;
  signUp?: Maybe<Scalars['String']>;
  updateTag?: Maybe<Scalars['Int']>;
};


export type MutationAddTagArgs = {
  addTagInput?: InputMaybe<AddTagInput>;
};


export type MutationRefreshTokenArgs = {
  refreshTokenInput: RefreshTokenInput;
};


export type MutationSignInArgs = {
  signInInput: SignInInput;
};


export type MutationSignOffArgs = {
  signOffInput: SignOffInput;
};


export type MutationSignUpArgs = {
  signUpInput: SignUpInput;
};


export type MutationUpdateTagArgs = {
  tagId: Scalars['ID'];
  updateTagInput: UpdateTagInput;
};

export type Query = {
  __typename?: 'Query';
  getTagsByUser?: Maybe<Array<Maybe<Tag>>>;
  hola?: Maybe<Scalars['String']>;
};

export type RefreshTokenInput = {
  currentRefreshToken: Scalars['String'];
  retryNumber: Scalars['Int'];
};

export type SignInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignOffInput = {
  currentRefreshToken: Scalars['String'];
};

export type SignUpInput = {
  email: Scalars['String'];
  nick: Scalars['String'];
  password: Scalars['String'];
};

export type Tag = {
  __typename?: 'Tag';
  _id: Scalars['ID'];
  creationDate: Scalars['String'];
  state: Scalars['String'];
  updateDate: Scalars['String'];
  userId: Scalars['ID'];
  value: Scalars['String'];
};

export type TokensOutput = {
  __typename?: 'TokensOutput';
  accessToken?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
};

export type UpdateTagInput = {
  value: Scalars['String'];
};
