const table = document.getElementById("user");
table.innerHTML = load();

// Using XMLHttpRequest
function getData(url, cb) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status === 200) {
        return cb(JSON.parse(xhr.responseText));
      }
    };
    xhr.open("GET", url);
    xhr.send();
  }
  
  const data = getData("https://jsonplaceholder.typicode.com/users/", function(data) {
      table.innerHTML = render(data);
  });

// Using fetch
// fetch("https://jsonplaceholder.typicode.com/users")
//     .then((res) => res.json())
//     .then((res) => {
//         table.innerHTML = render(res);
//     });

function render(result) {
    let table = "";
    result.map(data => {
        table += `<tr class="bg-white hover:bg-slate-200 text-left">
                  <td class="border-x-0 border-y-2 border-slate-700 px-2">${data.id}</td>
                  <td class="border-x-0 border-y-2  border-slate-700 px-2">${data.name}</td>
                  <td class="border-x-0 border-y-2 border-slate-700 px-2">${data.username}</td>
                  <td class="border-x-0 border-y-2 border-slate-700 px-2">${data.email}</td>
                  <td class="border-x-0 border-y-2 border-slate-700 px-2">
                    ${data.address.street},
                    ${data.address.suite}, 
                    ${data.address.city}
                  </td class="border-x-0 border-y-2 border-slate-700 px-2">
                  <td class="border-x-0 border-y-2 border-slate-700 px-2">${data.company.name}</td>
                </tr>`;
    });
    return table;
}
  
  function load() {
    return `<tr>
      <td colspan="6" class="text-center">Loading...</td>
    </tr>`;
  }