Somehow, most examples of Git’s clone command show a subfolder for the repository to be cloned into. I, for example, prefer navigating to the desired directory and like to clone into the current directory. The Git command has to be changed to appear as follows:
```bash	
git clone git@github.com:your-username/repository-name.git .

git clone https://github.com/your-username/repository-name .
```

(stolen from the Internet)