---
title: How to undo a commit in git
---

Sometimes you mess up and make a mistake in your project. Git keeps everything about it in repository history. But it also prioritizes users will, thus allowing for rewriting said history.

## Undo a commit

First, enter your repository and make sure the working tree is clean. You can check that via `git status`. Discard any changes, if you have any.

Now you can issue a variant of this command:

```sh
git reset --hard HEAD~
# or
git reset --soft HEAD~3
```

- `--hard` will completely delete changes made by the commits you are reverting
- `--soft` will keep them

Number after `HEAD~` part is the number of commits to undo. Not specifying it will default to one. 

## Remote repository

Reverting commits will place your local copy behind. You can force apply your changes like this:

```sh
git push origin master --force
```

Keep in mind others working with said repository might get errors, or get confused if you do this. Try to restrict possibility of getting such mistakes in upstream with other users. For example, by working alone in a separate branch.
