Title: Automatically Running Build Script When Switching Branchs Using Git Hooks
Date: 2020-09-18 15:00
Category: Development Tools
Tags: git, hooks, 
Slug: automatically-running-build-scripts-switching-branches-git-hooks
Authors: Frank Corso
Summary: Have build scripts that you have to run every time you switch branches in git? Use git hooks to run them automatically!

I have recently been working on a project where we had multiple different JavaScript-heavy features being developed. So, there were many times where I switched branches to test out features.

But, I would constantly spend countless time figuring out why the feature wasn't working until I realized I had once again forgotten to build the assets.

So, I started looking into git hooks to see what my options were.

## What are git hooks?
Within git, there are [17 events that fire upon different actions](https://www.git-scm.com/docs/githooks#_post_checkout) being taken. During each event, there is a "hook" that anyone can hook scripts into.

Each git repo has a `.git/hooks` directory that can contain scripts to be hooked into any of the hooks. You can drop a script that matches a hook's name into this folder.

Since this was a simple gulp command, I used a bash script. But, you could also use other languages, including Ruby or Python.

## Hooking into post-checkout
In order to run code upon switching branches, we need the `post-checkout` hook. This hook fires after you checkout a branch or a file.

Inside the `.git/hooks` directory, I added a new file named `post-checkout`.

The post-checkout script gets called with three parameters:
1. The previous HEAD
2. The new HEAD
3. A flag for if it's a branch that is being checked out. 1 for branch and 0 for not.

Since this also gets called when you check out a file, such as rolling back a file, this can cause a cycle where you roll back a built file and then it autogenerates the file again. To get around this, I check for the third parameter to make sure it's a `'1'`.

Inside my `if`, I then added our gulp task, which builds all of our assets, `gulp prebuild`.

```
#!/bin/sh
#
# Builds our assets upon checkout
#
# Args passed to this are:
# $1 - Previous HEAD
# $2 - New HEAD
# $3 - 1 if checking out a branch, 0 if checking out something else, such as a file (rollbacks)
#
if [ '1' == $3 ]
then
    echo 'Branch checkout detected. Building assets...'
    gulp prebuild
fi
```

## Next Steps
Now that I have a rough idea of how git hooks work, I could see having scripts for validating commit messages, creating notifications, or automating other build tasks. I also came across articles on automating simple deployments [using the post-receive hook](https://www.digitalocean.com/community/tutorials/how-to-use-git-hooks-to-automate-development-and-deployment-tasks), which I could see one used to build simple websites or even docker containers automatically.