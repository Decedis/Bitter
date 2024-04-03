# Resource Gatherer

## Primary technology

- React
- Typescript
- Tailwind
- Supabase/Postgres
- Zod

## Purpose

- This project is primarily for practice and gaining familiarity with technologies.

## Planned Features

- Feed + Bookmarks
- Post creation + post likes
- Profiles
  - Follows/Following
- Search

## Improvements

- Update the hooks to only work if the data is present

## Feature TODO

- [x] Login
- [ ] Account creation
- [x] Create posts
- [x] Like posts
- [ ] Bookmark posts
- [ ] Bookmark route
- [x] Delete posts
- [ ] Edit posts
- [x] Render comments
- [x] Create comments
- [x] Like comments
- [ ] Hashtag rendering in comments, posts, and search
- [x] Profile route
- [ ] Profile view with posts and comments

## Code TODO

- [ ] Refactor backend hooks into a single provider
- [ ] Update providers and hooks such that they assume a user is present
- [ ] Create CommentFavorites type and database route
- [ ] Refactor shared or similar `isHeartActive` code between `PostCard` and `CommentCard` components.
- [ ] Update user state to set the state as the local storage value instead of wiping it every time the app refreshes. If this is done, then the user value needs to be validated against the database. Username and the Password.
