// ==ClosureCompiler==
// @output_file_name default.js
// @compilation_level SIMPLE_OPTIMIZATIONS
// @language_out ECMASCRIPT_2017
// ==/ClosureCompiler==
javascript: (function () {
    renderCopyIssueLinkButton();
    renderCopySubtaskLinkButton();
    function renderCopyIssueLinkButton(){
        if(document.querySelector('.copy-issue-link-button')){
            console.log('canceled');
            return;
        }
        const copyTableButton = createButton('表形式', 'copy-issue-table-button', () => {
            const table = createIssuesTable([getCurrentIssue()]);
            writeTableToClipboard(table);
        });
        const copyTextButton = createButton('テキスト形式', 'copy-issue-text-button', () => {
            const issues = createIssueList([getCurrentIssue()])
            navigator.clipboard.writeText(issues.join(''));
        });
        const label = document.createElement('label');
        label.innerText = 'チケットリンクをコピー: ';
        const issueContainer = document.querySelector('[data-test-id="issue.views.issue-details.issue-layout.left-most-column"]');
        issueContainer.insertBefore(copyTextButton, issueContainer.firstChild);
        issueContainer.insertBefore(copyTableButton, issueContainer.firstChild);
        issueContainer.insertBefore(label, issueContainer.firstChild);
    }
    function renderCopySubtaskLinkButton(){
        if(document.querySelector('.copy-subtask-button')){
            console.log('canceled');
            return;
        }
        const subtaskContainer = document.querySelector('[for=childIssuesPanel]').parentNode.parentNode;
        const copyTableButton = createButton('表形式', 'copy-subtask-table-button', () => {
            const subtasks = getSubtask()
            const table = createIssuesTable(subtasks);
            writeTableToClipboard(table);
        });
        const copyTextButton = createButton('テキスト形式', 'copy-subtask-text-button', () => {
            const subtasks = getSubtask()
            const issues = createIssueList(subtasks);
            navigator.clipboard.writeText(issues.join(''));
        });
        const label = document.createElement('label');
        label.innerText = 'チケットリンクをコピー: ';
        const header = subtaskContainer.querySelector('[for=childIssuesPanel]')
        header.append(label);
        header.append(copyTableButton);
        header.append(copyTextButton);
    }
    function createButton(buttonTitle, className, onclick){
        const button = document.createElement("button");
        button.className = className;
        button.textContent = buttonTitle;
        button.style.backgroundColor = 'transparent';
        button.style.border = 'none';
        button.style.color = '#767676';

        button.addEventListener("click", onclick);
        return button;
    }
    function createIssuesTable(issues){
        const excelTable = document.createElement('table');

        issues.forEach((issue) => {
            const tr = document.createElement('tr');
            const issueUrl = `${window.location.protocol}//${window.location.host}/browse/${issue.issueKey}`;
            tr.innerHTML = `<tr><td><a href="${issueUrl}">${issue.issueKey}</a></td><td>${issue.summery}</td></tr>`;
            excelTable.appendChild(tr);
        });
        
        return excelTable;
    }
    function createIssueList(issues){
        return issues.map((issue)=>{
            const issueUrl = `${window.location.protocol}//${window.location.host}/browse/${issue.issueKey}`;
            return `${issue.issueKey} ${issue.summery} ${issueUrl}\n`;
        })
    }
    function getCurrentIssue(){
        const linkElm = document.querySelector(
            '[data-test-id="issue.views.issue-base.foundation.breadcrumbs.breadcrumb-current-issue-container"] > li > a'
          );
        const headingElm = document.querySelector(
            '[data-test-id="issue.views.issue-base.foundation.summary.heading"]'
        );
        return {
            issueKey: linkElm.innerText,
            summery: headingElm.innerHTML
        }
    }
    function getSubtask(){
        const links = [...subtaskContainer.querySelectorAll('[data-test-id="issue.issue-view.views.common.issue-line-card.issue-line-card-view.key"]')];
        const summeries = [...subtaskContainer.querySelectorAll('[data-test-id="issue.issue-view.views.common.issue-line-card.issue-line-card-view.summary"]')];
        return links.map((link, index) => {
            return {
                issueKey: link.innerText,
                summery: summeries[index].innerText
            }
        })
    }
    function writeTableToClipboard(table) {
        const blob = new Blob([table.outerHTML], { type: "text/html" });
        navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
    }
})();