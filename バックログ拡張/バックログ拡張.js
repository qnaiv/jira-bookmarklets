// ==ClosureCompiler==
// @output_file_name default.js
// @compilation_level SIMPLE_OPTIMIZATIONS
// @language_out ECMASCRIPT_2017
// ==/ClosureCompiler==
javascript: (function () {
    renderCloseAllButton();
    renderCopyButtons();

    function renderCloseAllButton(){
        let isClosed = false;
        if(document.querySelector('.close-all-sprint-button')){
            console.log('canceled');
            return;
        }
        const button = document.createElement('button');
        button.innerHTML = '全て開く/閉じる';
        button.style.border = 'none';
        button.classList.add('close-all-sprint-button');
        button.addEventListener('click', () => {
            const sprints = [...document.querySelectorAll('.ghx-backlog-container')];
            if(isClosed){
                sprints.forEach(button => {
                    console.log('open');
                    isClosed = false;
                    button.classList.add('ghx-open');
                    button.classList.remove('ghx-closed');
                });
            }else{
                sprints.forEach(button => {
                    console.log('closed');
                    isClosed = true;
                    button.classList.add('ghx-closed');
                    button.classList.remove('ghx-open');
                });
            }   
        });
        document.getElementById('ghx-modes-tools').insertBefore(button, document.getElementById('ghx-modes-tools').firstChild);
    }

    function renderCopyButtons(){
        if(document.querySelector('.issue-copy-button')){
            console.log('canceled');
            return;
        }
        const sprints = [...document.querySelectorAll('.js-sprint-container')];
        sprints.forEach((sprint)=>{
            const label = document.createElement('label');
            const sprintName = sprint.querySelector('.js-sprint-header .ghx-name').outerText;

            label.innerText = `${sprintName}のチケットをコピー: `;
            const tableCopyButton = createTableCopyButton(sprint);
            const textCopyButton = createTextCopyButton(sprint);
            sprint.insertBefore(tableCopyButton, sprint.firstChild);
            sprint.insertBefore(textCopyButton, sprint.firstChild);
            sprint.insertBefore(label, sprint.firstChild);
        })
    }

    function createTableCopyButton(sprint){
        const button = document.createElement('button');
        button.innerText = `表形式`;
        button.className = 'issue-copy-button';
        button.style.backgroundColor = 'transparent';
        button.style.border = 'none';
        button.style.color = '#767676';
        button.onclick = ()=>{
            try{
                const table = createIssuesTable(sprint);
                const blob = new Blob([table.outerHTML], { type: "text/html" });
                navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
            } catch(e){
                window.alert(e);
            }
        }
        return button;
    }

    function createTextCopyButton(sprint){
        const button = document.createElement('button');
        button.innerText = `テキスト形式`;
        button.className = 'issue-copy-button';
        button.style.backgroundColor = 'transparent';
        button.style.border = 'none';
        button.style.color = '#767676';
        button.onclick = ()=>{
            try{
                const issues = createIssueList(sprint);
                navigator.clipboard.writeText(issues.join(''));
            } catch(e){
                window.alert(e);
            }
        }
        return button;
    }

    function createIssuesTable(targetSprint){
        const excelTable = document.createElement('table');
        [...targetSprint.querySelectorAll('.js-issue-list .js-issue')].forEach((elem)=>{
            const issueKey = $('.js-key-link', elem).text();
            const issueUrl = `${window.location.protocol}//${window.location.host}/browse/${issueKey}`;
            const summery = $('.ghx-summary', elem).text();
            const tr = document.createElement('tr');
            tr.innerHTML = `<tr><td><a href="${issueUrl}">${issueKey}</a></td><td>${summery}</td></tr>`;
            excelTable.appendChild(tr);
        })
        return excelTable;
    }
    function createIssueList(targetSprint){
        return [...targetSprint.querySelectorAll('.js-issue-list .js-issue')].map((elem)=>{
            const issueKey = $('.js-key-link', elem).text();
            const issueUrl = `${window.location.protocol}//${window.location.host}/browse/${issueKey}`;
            const summery = $('.ghx-summary', elem).text();
            return `${issueKey} ${summery} ${issueUrl}\n`;
        })
    }
})();