
git checkout -- .
rm -fr .git
npm i bcryptjs
npm i express-validator
git rm .env --cached
npm install --save express-validator
npm install express-validator@5.3.1 --save-exact

npm i jsonwebtoken
npm install google-auth-library --save

npm i express-fileupload

npm i socket.io

#How can I change the author name / email of a commit?
#Changing Your Committer Name & Email Globally
$ git config --global user.name "John Doe"
$ git config --global user.email "john@doe.org"

#Changing Your Committer Name & Email per Repository
$ git config user.name "John Doe"
$ git config user.email "john@doe.org"

#Changing the Author Information Just for the Next Commit
git commit --author="John Doe <john@doe.org>"

#Editing the Author of Past Commits
#Using --amend for the Very Last Commit
git commit --amend --author="John Doe <john@doe.org>"

#Using Interactive Rebase
$ git rebase -i -p 0ad14fa5

Stopped at 5772b4bf2... Add images to about page
You can amend the commit now, with

    git commit --amend

Once you are satisfied with your changes, run

    git rebase --continue

$ git commit --amend --author="John Doe <john@doe.org>" --no-edit
$ git rebase --continue   


#Using git filter-branch
$ git filter-branch --env-filter '
WRONG_EMAIL="wrong@example.com"
NEW_NAME="New Name Value"
NEW_EMAIL="correct@example.com"

if [ "$GIT_COMMITTER_EMAIL" = "$WRONG_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$NEW_NAME"
    export GIT_COMMITTER_EMAIL="$NEW_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$WRONG_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$NEW_NAME"
    export GIT_AUTHOR_EMAIL="$NEW_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags


rectas              maximo      liviano     100km
rectas              MODERADO    liviano     100-135km

carreteras  curvas  maximo      liviano     60km
carreteras  curvas  moderado    liviano     60-75km

PERIMETRAL          maximo      liviano     90km
PERIMETRAL          moderado    liviano     90-120km

URBANA              MODERADO    liviano     50-60km
URBANA              maximo<>    liviano     50km