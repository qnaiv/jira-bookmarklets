// ==ClosureCompiler==
// @output_file_name default.js
// @compilation_level SIMPLE_OPTIMIZATIONS
// @language_out ECMASCRIPT_2017
// ==/ClosureCompiler==
javascript: (function () {
  const linkElm = document.querySelector(
    '[data-test-id="issue.views.issue-base.foundation.breadcrumbs.breadcrumb-current-issue-container"] > li > a'
  );
  console.log(linkElm);
  const url = linkElm.href;
  const issueKey = linkElm.innerText;

  const tmp = document.createElement("textarea");
  tmp.textContent = `=HYPERLINK("${url}", "${issueKey}")`;
  document.body.appendChild(tmp);
  tmp.select();
  document.execCommand("copy");
  tmp.remove();
})();
