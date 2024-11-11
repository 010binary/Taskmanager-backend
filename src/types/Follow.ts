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

export type { FollowCount, Follows, Result };
