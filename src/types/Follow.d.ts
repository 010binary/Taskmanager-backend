type Follow = {
  followedByCount: number;
  followingcount: number;
};

type Follows = {
  id: string;
  fullname: string;
  occupation: string;
};

type Result<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

type FollowCount = Result<Follow>;
type AddFollowing = Result<{ message: string }>;
type RemoveFollowing = Result<{ message: string }>;

export type { FollowCount, Follows, Result, AddFollowing, RemoveFollowing };
