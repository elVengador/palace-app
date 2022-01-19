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

export type Media = {
  __typename?: 'Media';
  _id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  size: Scalars['Int'];
  url: Scalars['String'];
};

export type MediaInput = {
  name: Scalars['String'];
  size: Scalars['Int'];
  url: Scalars['String'];
};

export type MediaUpdate = {
  id: Scalars['ID'];
  name: Scalars['String'];
  size: Scalars['Int'];
  url: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addMedia?: Maybe<Scalars['ID']>;
  addPermission?: Maybe<Scalars['ID']>;
  addView?: Maybe<Scalars['ID']>;
  privateContent?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<TokensOutput>;
  removeMedia?: Maybe<Scalars['Int']>;
  signIn?: Maybe<TokensOutput>;
  signOff?: Maybe<Scalars['Boolean']>;
  signUp?: Maybe<Scalars['String']>;
  updateMedia?: Maybe<Scalars['Int']>;
};


export type MutationAddMediaArgs = {
  mediaInput: MediaInput;
};


export type MutationAddPermissionArgs = {
  permissionInput: PermissionInput;
};


export type MutationAddViewArgs = {
  viewInput: ViewInput;
};


export type MutationRefreshTokenArgs = {
  refreshTokenInput: RefreshTokenInput;
};


export type MutationRemoveMediaArgs = {
  id: Scalars['ID'];
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


export type MutationUpdateMediaArgs = {
  mediaUpdate: MediaUpdate;
};

export type Permission = {
  __typename?: 'Permission';
  _id?: Maybe<Scalars['ID']>;
  description: Scalars['String'];
  name: Scalars['String'];
  state: Scalars['String'];
};

export type PermissionInput = {
  description: Scalars['String'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getMedia?: Maybe<Media>;
  getPermission?: Maybe<Permission>;
  getView?: Maybe<View>;
};


export type QueryGetMediaArgs = {
  id: Scalars['ID'];
};


export type QueryGetPermissionArgs = {
  id: Scalars['ID'];
};


export type QueryGetViewArgs = {
  id: Scalars['ID'];
};

export type RefreshTokenInput = {
  currentRefreshToken: Scalars['String'];
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

export type TokensOutput = {
  __typename?: 'TokensOutput';
  accessToken?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['ID']>;
  birthday: Scalars['String'];
  dni: Scalars['String'];
  email: Scalars['String'];
  maternalLastName: Scalars['String'];
  name: Scalars['String'];
  nick: Scalars['String'];
  password: Scalars['String'];
  paternalLastName: Scalars['String'];
  phone: Scalars['String'];
  photo: Media;
  state: Scalars['String'];
};

export type View = {
  __typename?: 'View';
  _id?: Maybe<Scalars['ID']>;
  description: Scalars['String'];
  icon: Scalars['String'];
  name: Scalars['String'];
};

export type ViewInput = {
  description: Scalars['String'];
  icon: Scalars['String'];
  name: Scalars['String'];
};
