    var userFormEl = document.querySelector("#user-form");
    var nameInputEl = document.querySelector("#username");
    var repoContainerEl = document.querySelector("#repos-container");
    var repoSearchTerm = document.querySelector("#repo-search-term");


    let getUserRepos = function (user) {
        //format the github api url
        let apiUrl = "https://api.github.com/users/" + user + '/repos';
        //make a request to the url
        fetch(apiUrl).then(function (response) {
            response.json().then(function (data) {
                displayRepos(data, user);
            })
        })
    }

    var formSubmitHandler = function (event) {
        event.preventDefault();
        //get value from input element
        let username = nameInputEl.value.trim();

        if (username) {
            getUserRepos(username);
            nameInputEl.value = '';
        } else {
            alert('Please enter a Github username');
        }
    };

    let displayRepos = function (repos, searchTerm) {
        // clear old content
        repoContainerEl.textContent = "";
        repoSearchTerm.textContent = searchTerm;
        for (let i = 0; i < repos.length; i++) {
            //format repo name
            let repoName = repos[i].owner.login + '/' + repos[i].name;

            //create a container for each repo
            let repoEl = document.createElement('div');
            repoEl.classList = 'list-item flex-row justify-space-between align-center';

            //create a span element to hold repository name
            let titleEl = document.createElement('span');
            titleEl.textContent = repoName;

            // create a status element
            var statusEl = document.createElement("span");
            statusEl.classList = "flex-row align-center";

            // check if current repo has issues or not
            if (repos[i].open_issues_count > 0) {
                statusEl.innerHTML =
                    "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
            } else {
                statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
            }

            // append to container
            repoEl.appendChild(statusEl); //append to container
            repoEl.appendChild(titleEl);

            //append container to dom
            repoContainerEl.appendChild(repoEl);

        }
        //    console.log(repos);
        //         console.log(searchTerm);
    }

    userFormEl.addEventListener("submit", formSubmitHandler);