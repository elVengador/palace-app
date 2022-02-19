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

export type AddNoteInput = {
  tagId: Scalars['ID'];
  value: Scalars['ID'];
};

export type AddTagInput = {
  value: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addNote?: Maybe<NoteOutput>;
  addTag?: Maybe<Tag>;
  privateContent?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<TokensOutput>;
  signIn?: Maybe<TokensOutput>;
  signOff?: Maybe<Scalars['Boolean']>;
  signUp?: Maybe<Scalars['String']>;
  updateNote?: Maybe<NoteOutput>;
  updateTag?: Maybe<Tag>;
};


export type MutationAddNoteArgs = {
  addNoteInput?: InputMaybe<AddNoteInput>;
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


export type MutationUpdateNoteArgs = {
  noteId: Scalars['ID'];
  updateNoteInput?: InputMaybe<UpdateNoteInput>;
};


export type MutationUpdateTagArgs = {
  tagId: Scalars['ID'];
  updateTagInput: UpdateTagInput;
};

export type Note = {
  __typename?: 'Note';
  _id: Scalars['ID'];
  creationDate: Scalars['String'];
  creationUser: Scalars['ID'];
  state: Scalars['String'];
  tagId: Scalars['ID'];
  updateDate: Scalars['String'];
  value: Scalars['String'];
};

export type NoteOutput = {
  __typename?: 'NoteOutput';
  _id: Scalars['ID'];
  creationDate: Scalars['String'];
  creationUser: Scalars['ID'];
  state: Scalars['String'];
  tags: Array<Tag>;
  updateDate: Scalars['String'];
  value: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getNotesByTag?: Maybe<Array<Maybe<NoteOutput>>>;
  getNotesByUser?: Maybe<Array<Maybe<NoteOutput>>>;
  getTagsByUser?: Maybe<Array<Maybe<Tag>>>;
  hola?: Maybe<Scalars['String']>;
};


export type QueryGetNotesByTagArgs = {
  tagId: Scalars['ID'];
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

export type UpdateNoteInput = {
  tagId: Scalars['ID'];
  value: Scalars['ID'];
};

export type UpdateTagInput = {
  value: Scalars['String'];
};
