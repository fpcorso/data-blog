Title: Setting Up Your Python Environment With Venv and requirements.txt
Date: 2020-12-14 08:20
Category: Python
Tags: venv, requirements, pip
Slug: setting-up-python-environment-venv-requirements
Authors: Frank Corso
Summary: Learn how to use virtual environments and requirements.txt to maintain your projects better.
Status: draft

By default, all the Python packages you install on your computer are used within all of your projects. But, what if one project requires version 1 of a package and another project requires version 2?

Or, if you have multiple people working on a project, how do you tell them which dependencies are needed and make sure everyone is using the same versions?

This is where using requirements.txt and virtual environments come in.

## What is requirements.txt?

When you usually install a package, you probably do something like:

`pip install pandas`

But, imagine if you have someone else working on the project and they also install pandas. Or, maybe you are deploying your project to Netlify or are using Docker. How do you make sure the right dependencies get installed and the correct version?

With requirements.txt, you can list all the required packages for your project and what version is needed. If you are familiar with NPM or Composer, you may have seen a similar concept in their package.json or composer.json files.

## Creating your requirements.txt

In your project, you can create a `requirements.txt` file. Inside, you can list each package that is needed.

```
:::text
matplotlib
numpy
openpyxl
pandas
```

To make it easy to scan and read, the list is normally alphabetical. If you want a specific version, you could add an equal sign like this:

```
:::text
matplotlib==3.3.3
numpy==1.19.3
openpyxl==3.0.5
pandas==1.0.5
```

Now, it would be challenging to manually write out all your dependencies and remember to change the version number when you upgrade. Luckily, `pip` can help with this.

If you ever want to see what packages you have installed, you can run `pip list`. This will output all the packages install and their version numbers.

```
:::text
Package         Version
--------------- ---------
matplotlib      3.3.3
numpy           1.19.3
openpyxl        3.0.5
pandas          1.0.5
```

Even better, you can use `pip freeze > requirements.txt` to automatically take this list and store it in your `requirements.txt` file.

As you add, update, and remove packages, you can run that command again to update your `requirements.txt` file.

## Installing from your requirements.txt

Let's say you just cloned a git repo. This repo contains a `requirements.txt` file. What do you do next?

Once again, `pip` is here to help. We can run `pip install -r requirements.txt` to have pip automatically install all dependencies listed in the `requirements.txt` file.

## Using virtual environments

Now, if you only have one Python project on your computer, this may be fine as-is. But, what if you start cloning or creating several projects all with their own `requirements.txt` files? You can quickly end up with package versions that are not compatible with each other.

This is where virtual environments come in. You can set up your project to exist within its own environment and packages only installed within that environment. Each project will have its own environment and its own packages installed within it.

To create your virtual environment, go into your project and run:

`python -m venv .venv`

The last parameter, `.venv`, is the name of the directory to install the virtual environment into. You can name this whatever you would like, but I like to stick with `.venv` as it's easy to tell what it is and it doesn't conflict with directory names I use with other systems.

Once the command is finished, your virtual environment will be ready. Next, you can "activate" it by running the activation script.

If you are on Windows, you will use `.venv\Scripts\activate.bat`.

On other OSes, you will use `source .venv/bin/activate`.

Once activated, you will see the name of the environment within the terminal.

```
:::console
(.venv) fpcorso:~$ pip install -r requirements.txt
```

Now, you will be able to install packages and run Python within the environment without interfering with packages installed globally.

Once you are finished, just use the `deactivate` command to exit the virtual environment.

## Next steps

Going forward, you will want to install a virtual environment within all of your projects and install packages within. Then, use the `pip freeze > requirements.txt` command to generate your `requirements.txt` file to keep everyone working on the project in-sync.