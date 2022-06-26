document.getElementById("add-url").addEventListener("click", function () {
    var url = document.getElementById("url-text").value;
    if (url.length <= 0) return;
    if (url.indexOf(",") > -1) {
        var urls = url.split(",");
        urls.forEach(function (url) {
            addUrl(url);
        });
    }
    else {
        addUrl(url);
    }
});

function addUrl(url) {
    var table = document.getElementById("url-list");
    url = url.toLowerCase();
    if (!url.match(/^https?:\/\//)) url="http://"+url;
    var row = table.insertRow(table.rows.length);
    
    row.insertCell(0).innerHTML = `<a href="${url}">${url}</a>`;
    row.insertCell(1);
    row.insertCell(2);
    row.insertCell(3).innerHTML = `<button class="btn-remove" onclick="removeRow(this)">X</button>`;

    const urlText = document.getElementById("url-text");
    urlText.value = "";
    urlText.focus();
}

document.getElementById("start-ping").addEventListener("click", function () {
    var table = document.getElementById("url-list");

    for (var i = 1; i < table.rows.length; i++) {
        var row = table.rows[i];
        var url = row.cells[0].innerText;
        var time = row.cells[2];
        var removeBtn = row.cells[3].firstChild;

        time.innerHTML = "Pinging...";
        removeBtn.disabled = true;
        ping(url, row);
    }
});

function removeRow(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function ping(url, row) {
    var xhr = new XMLHttpRequest();
    var timeStart = new Date();

    xhr.open("GET", url, true);
    xhr.timeout = 5000;
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var timeEnd = new Date();
            var time = timeEnd.getTime() - timeStart.getTime();
            row.cells[1].innerHTML = xhr.status;
            row.cells[2].innerHTML = time + "ms";
            row.cells[3].firstChild.disabled = false;
        }
    }

    xhr.ontimeout = function () {
        row.cells[1].innerHTML = "Timedout!";
        row.cells[2].innerHTML = "-1ms";
        row.cells[3].firstChild.disabled = false;
    }

    xhr.send();
}