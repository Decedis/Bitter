# Resource Gatherer

## Primary technology

- React
- Typescript
- Tailwind
- Supabase/Postgres

## Purpose

- This project is primarily for practice and gaining familiarity with technologies.

## Planned Features

- Feed
  - Can be customized or set to `GLOBAL`
  - Custom feeds can be set to single categories, or multiple.
- Resource creation point
  - Each `point` will have a URL, category, tag, and a brief description.
  - Each `point` can be set to public or private
  - Each `point` can be favorited
  - Restricted Actions:
    - Deletion => Only the author can delete their `point`
    - Cloning => The author can prohibit or allow the cloning of their `point`
    - Comments => Set to `true` by default, the author can limit comments on their `points`.
- Profiles
  - Stat
    - Created `points`
    - Comments
  - Bio
    - Age
    - Name
    - Field
  - Starred `points`
  - Follows/Following
    - Public / Private
- Complex Features
  - Cross referencing => Generate a new `point` based on two or more `points`
    - Comments are set to `true` by default
