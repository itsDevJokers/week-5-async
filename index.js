// Membuat table yang ditangkap dari element HTML tbody dengan id user
const table = document.getElementById("user");
// Setelah itu tbody berisi function load yang dipanggil
table.innerHTML = load();

// Membuat XMLHttpRequest
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
  
  // Membuat const data dari function getData dimana parameternya berupa endpoint api dan juga callback nya   
  const data = getData("https://jsonplaceholder.typicode.com/users/", function(data) {
    // table diisi dengan kembalian dari function render dengan parameter berupa data
      table.innerHTML = render(data);
  });

//   Membuat function render untuk menampilkan isi data dari table
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
  
// membuat function load untuk membuat loading
  function load() {
    return `<tr>
      <td colspan="6" class="text-center">Loading...</td>
    </tr>`;
  }