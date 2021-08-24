let issuesContainerEl = document.querySelector('#issues-container');


let getRepoIssues = function (repo) {
    let apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function (reponse) {
        if (reponse.ok) {
            reponse.json().then(function (data) {
                //pass response data to dom function
                displayIssues(data);
            })
        } else {
            alert('There was a problem with your request!');
        }
    })
}

let displayIssues = function (issues) {
    if (issues.length === 0) {
        issuesContainerEl.textContent = 'This repo has no open issues!';
        return;
    }
        for (let i = 0; i < issues.length; i++) {
            //create a link element to take users to the issue on Github
            let issueEl = document.createElement('a');
            issueEl.classList = 'list-item flex-row justify-space-between align-center';
            issueEl.setAttribute('href', issues[i].html_url);
            issueEl.setAttribute('target', '_blank');
            // create span to hold issue title
            var titleEl = document.createElement("span");
            titleEl.textContent = issues[i].title;

            // append to container
            issueEl.appendChild(titleEl);

            // create a type element
            var typeEl = document.createElement("span");

            // check if issue is an actual issue or a pull request
            if (issues[i].pull_request) {
                typeEl.textContent = "(Pull request)";
            } else {
                typeEl.textContent = "(Issue)";
            }

            // append to container
            issueEl.appendChild(typeEl);
            issuesContainerEl.appendChild(issueEl);
        }
    }
        getRepoIssues('davetoth77/run-buddy');