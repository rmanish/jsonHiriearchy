# happi Digital Backend BluePrint
Help to provide initial/core structure or generic modules for backend.More modules can be added over this structure.

## Getting Started
Blue Print is build up on 
- NodeJS - https://nodejs.org/en/
- Hapi Framework - https://hapijs.com/
- Serverless - https://serverless.com/
- AWS Lambda - https://aws.amazon.com/lambda/
- BluePrint Repo - https://gitlab.com/happidigital/blueprints/serverless

### Installing

1. Install `nvm`, ref - https://github.com/creationix/nvm or using any other option like - `Homebrew`.
    - nvm install 8.10.0 .
    - nvm use default.
2. Install Homebrew `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
3. Reference: `https://brew.sh/`
     - `mkdir ~/.nvm`
     - `nano ~/.bash_profile`

4. In your .bash_profile file (you may be using the other file, according to your shell), add the following:
   - export NVM_DIR="$HOME/.nvm" [ -s "/usr/local/opt/nvm/nvm.sh" ] && . "/usr/local/opt/nvm/nvm.sh"  # This loads nvm
     [ -s "/usr/local/opt/nvm/etc/bash_completion" ] && . "/usr/local/opt/nvm/etc/bash_completion"  # This loads nvm bash_completion   
5. Close and open your terminal again. Or Run the below command once for reloading your profile.
    - source ~/.bash_profile OR . - . ~/.bash_profile
6. Verify nvm is installed or not by using the below command:
    -`nvm -v`
7. Clone the repo using `git clone git@gitlab.com:happidigital/blueprints/serverless.git`.
8. Run `npm run init` on your terminal at project root directory path.
9. Install Mysql Steps are Below

10. Run `npm start` on your terminal to run the app.
11. App will be up on http://localhost:3000/.
12. To create swagger file run  npm run generate
 

### Running the tests
- run `npm test` to run the test cases.

### Modules List
- [Generic Status Codes](https://gitlab.com/happidigital/wiki/docs/wikis/List-of-HTTP-status-codes).
- [Linting Rules](https://gitlab.com/happidigital/wiki/docs/wikis/Lint-and-pre-commit-Docs-for-(BE)).
- [Boom](https://github.com/hapijs/boom/blob/master/API.md)

### Packages List
- jest - Jest is a delightful JavaScript Testing Framework with a focus on simplicity. (https://jestjs.io/)

### Editor Config
Name: EditorConfig for VS Code
Id: editorconfig.editorconfig
Description: EditorConfig Support for Visual Studio Code
Version: 0.13.0
Publisher: EditorConfig
[VS Marketplace](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

### Debugging 
Download and place this file [launch.json](https://gitlab.com/happidigital/pmo/serverless-blueprint/issues/22) in .vscode folder of the IDE

### Submodules
- [Git Submodules Docs](https://gitlab.com/happidigital/wiki/docs/wikis/Git-Submodules).

### MySql
- [Download] (https://dev.mysql.com/downloads/file/?id=485724).
- [After install] 
- echo 'export PATH="/usr/local/mysql/bin:$PATH"' >> ~/.bash_profile
- mysql -u root -p
- Create DB and table

- override below code in `.env` and `.env.dev`
   -  DB_NAME=`your mysql db name`
   -  DB_USER=`DB User Name`
   -  DB_PASSWORD= `your mysql password`
   -  DB_HOST=127.0.0.1
   -  DB_PORT=3306
    -  also redis
- run command npm run db; (for setting up Migrations and seeders with basic DB structure and data)

### Download Xcode from App Store

### GitLab Step
- [Generate SSh Key]
1. Enter the following command in the Terminal window. `ssh-keygen -t rsa` This starts the key generation process. When you execute this command, the ssh-keygen utility prompts you to indicate where to store the key.
2. Press the ENTER key to accept the default location. The ssh-keygen utility prompts you for a passphrase.
3. Type in a passphrase. You can also hit the ENTER key to accept the default (no passphrase). However, this is not recommended.

### Copy the key
Follow below step
1. Go to your command line and follow the instructions to generate your SSH key pair and run `pbcopy < ~/.ssh/id_rsa.pub ` on terminal this command copy the public ssh key.
2. Log in to GitLab.
3. In the upper-right corner, click your avatar and select Settings.
4. On the User Settings menu, select SSH keys.
5. Paste the public key generated in the first step in the Key text field.
6. Optionally, give it a descriptive title so that you can recognize it in the event you add multiple keys.
7. Finally, click the Add key button to add it to GitLab. You will be able to see its fingerprint, title, and creation date.

### How to enable the log

1. Make `ENABLE_LOGGING` flag true in .env file
2. Update `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` in .env file
   - `AWS_ACCESS_KEY_ID`=XXXXXXXXXXXX
   - `AWS_SECRET_ACCESS_KEY`=XXXXXXXXXXXX

