# Bitter

## Primary technology

- React
- Typescript
- Tailwind

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
- [x] Bookmark posts
- [x] Bookmark route
- [x] Delete posts
- [x] Edit posts
- [x] Render comments
- [x] Create comments
- [x] Edit comments
- [x] Like comments
- [x] Profile route
- [x] Profile view with posts
- [ ] Toast pop-ups for bookmark creation, pos creation, and post deletion.

## Code TODO

- [ ] Refactor backend hooks into a single provider
- [ ] Update providers and hooks such that they assume a user is present
- [ ] Create CommentFavorites type and database route
- [ ] Refactor shared or similar `isHeartActive` code between `PostCard` and `CommentCard` components.
- [ ] Update user state to set the state as the local storage value instead of wiping it every time the app refreshes. If this is done, then the user value needs to be validated against the database. Username and the Password.
- [ ] Delete parent-less data points on the backend. EX: favorites continue to exist even if the parent post or parent comment no longer exists.
- [ ] Correct UI bugs
  - [ ] Form vertical height on patch components
  - [ ] Height on text components

## Version 2 Feature TODO

- [ ] Repost functionality
- [ ] Redesign
- [ ] Search + search results (store in URL state)
- [ ] Pagination (store in URL state)
- [ ] Image upload + custom user profile pictures
- [ ] Animations
- [ ] Notifications
- [ ] Implement Zod
- [ ] Implement DB
- [ ] Implement Tag system

## Tip:

- Choose to build only a slice of a larger project, this lets us create more projects.
