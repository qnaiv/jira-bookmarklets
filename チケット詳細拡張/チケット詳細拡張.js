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

        const button = document.createElement("button");
        button.className = 'copy-issue-link-button';
        button.textContent = "チケットリンクをEXCEL形式でコピー";
        button.style.backgroundColor = 'transparent';
        button.style.border = 'none';
        button.style.color = '#767676';
        button.addEventListener('click', () => {
            const linkElm = document.querySelector(
                '[data-test-id="issue.views.issue-base.foundation.breadcrumbs.breadcrumb-current-issue-container"] > li > a'
              );
            const headingElm = document.querySelector(
                '[data-test-id="issue.views.issue-base.foundation.summary.heading"]'
            );

            const issueKey = linkElm.innerText;
            const summery = headingElm.innerHTML;

            const table = createIssuesTable([{issueKey: issueKey, summery: summery}]);
            writeTableToClipboard(table);
        });

        const issueContainer = document.querySelector('[data-test-id="issue.views.issue-details.issue-layout.left-most-column"]');
        issueContainer.insertBefore(button, issueContainer.firstChild);
    }

    function renderCopySubtaskLinkButton(){
        if(document.querySelector('.copy-subtask-button')){
            console.log('canceled');
            return;
        }

        
        const copySubtaskButton = document.createElement("button");
        copySubtaskButton.className = 'copy-subtask-button';
        copySubtaskButton.textContent = "サブタスク情報をコピー";
        copySubtaskButton.style.backgroundColor = 'transparent';
        copySubtaskButton.style.border = 'none';
        copySubtaskButton.style.color = '#767676';

        const subtaskContainer = document.querySelector('[for=childIssuesPanel]').parentNode.parentNode;
        copySubtaskButton.addEventListener("click", () => {
            const links = [...subtaskContainer.querySelectorAll('[data-test-id="issue.issue-view.views.common.issue-line-card.issue-line-card-view.key"]')];
            const summeries = [...subtaskContainer.querySelectorAll('[data-test-id="issue.issue-view.views.common.issue-line-card.issue-line-card-view.summary"]')];
            
            const issues = links.map((link, index) => {
                return {
                    issueKey: link.innerText,
                    summery: summeries[index].innerText
                }
            })

            const table = createIssuesTable(issues);
            writeTableToClipboard(table);
        });

        subtaskContainer.querySelector('[for=childIssuesPanel]').append(copySubtaskButton);
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

    function writeTableToClipboard(table) {
        const blob = new Blob([table.outerHTML], { type: "text/html" });
        navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
    }
  })();
  