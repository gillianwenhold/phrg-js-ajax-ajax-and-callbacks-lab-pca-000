$(document).ready(function (){
});

function searchRepositories() {
  const searchTerms = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(data) {
    $("#results").html(showResults(data));
  }).fail(displayError());
}

function showResults(data) {
  console.log("In the showResults function");
  return data.items.map(i => `
    <img src="${i.owner.avatar_url}" style="width:100px">
    <h3>${i.name} | By: <a href="${i.owner.html_url}">${i.owner.login}</a></h3>
    <p>${i.description} <a href="${i.html_url}" target="_blank">Open Repo in Github</a></p>
    <a href="#" data-repository="${i.name}" data-owner="${i.owner.login}" onClick="showCommits(this)">Show Commits</a>
    <h1>-------------------------------</h1>
    `);
}

function showCommits(data) {
  console.log("In the showCommits function");
  $.get(`https://api.github.com/repos/${data.dataset.owner}/${data.dataset.repository}/commits`, function(data) {
    $("#details").html(formatCommits(data));
  }).fail(displayError());
}

function formatCommits(data) {
  console.log("In the formatCommits function");
  return data.map(d => `
    <img src="${d.author.avatar_url}" style="width:100px">
    <h3>${d.commit.author.name} | ${d.author.login}</h3>
    <p>${d.sha}</p>
    `)
}

function displayError() {
  $("#errors").html("There was an error. Please try again.");
}
