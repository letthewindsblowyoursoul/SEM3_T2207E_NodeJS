$(document).ready(function () {
  var url;
  var trElement;
  var page = 1;
  var user = {};
  showData(page);
  var urlHandleUser = 'GET';
  var handeMethod;
  var pageDanger = false;
  var deleteAll = false;
  pagination(1);

  // Pagination
  function pagination(pageNum) {
    $('#pagination').pagination({
      dataSource: function (done) {
        $.ajax({
          type: 'GET',
          url: '/api/list',
          success: function (response) {
            done(response.data);
          },
        });
      },
      // locator: 'data',
      pageNumber: pageNum,
      pageSize: 5,
      pageRange: 2,
      className: 'paginationjs-theme-blue paginationjs-big',
      afterPreviousOnClick: function (event, pageNumber) {
        page = pageNumber;
        showData(page);
      },
      afterPageOnClick: function (event, pageNumber) {
        page = pageNumber;
        showData(page);
      },
      afterNextOnClick: function (event, pageNumber) {
        page = pageNumber;
        showData(page);
      },
    });
  }

  $('#data-container').on('click', '.btn-delete-user', function (e) {
    trElement = $(this).closest('tr');
    url = $(this).data('action');
  });
  //
  $('#btn-delete-accept').click(function (e) {
    if (deleteAll) {
      $.ajax({
        type: 'DELETE',
        url: '/api/user/delete/all',
        success: function (response) {
          page = 1;
          pagination(page);
          showData(page);
          Toastify({
            text: 'Deleted all data in collection users!',
            close: true,
            duration: 3000,
            style: {
              background: '#dc3545',
            },
          }).showToast();
        },
      });
    } else {
      $.ajax({
        type: 'delete',
        url: url,
        success: function (response) {
          if (response.code == 200) {
            trElement.fadeOut(300);
            Toastify({
              text: ' Successfully deleted username: ' + response.data.username,
              close: true,
              duration: 3000,
              style: {
                background: '#dc3545',
              },
            }).showToast();
            setTimeout(() => {
              pageDanger ? page-- : (page = page);
              showData(page);
              pagination(page);
            }, 300);
          }
        },
      });
    }
    deleteAll = false;
  });
  //
  $('#btnAddNewUser').click(function (e) {
    modalHandleUser.show();
    handeMethod = 'POST';
    urlHandleUser = '/api/user/create';
    $('#modalHandleUserTitle').text('Add new user');
    $('#username').val('');
    $('#fullname').val('');
    $('#age').val('');
    $('#address').val('');
    $('#required').html('&nbsp;');
  });
  //

  $('#data-container').on('click', '.btn-edit-user', function (e) {
    $('#required').html('&nbsp;');
    let url = $(this).data('action');
    urlHandleUser = $(this).data('handle');
    trElement = $(this).closest('tr');
    handeMethod = 'PUT';
    $.ajax({
      type: 'get',
      url: url,
      success: function (response) {
        if (response.code == 200) {
          user = response.data;
          $('#modalHandleUserTitle').text('Edit user');
          $('#username').val(user.username);
          $('#fullname').val(user.fullname);
          $('#age').val(user.age);
          $('#address').val(user.address);
        }
      },
    });
  });
  //
  $('#handle-user').submit(function (e) {
    e.preventDefault();
    user.username = $('#username').val();
    user.fullname = $('#fullname').val();
    user.age = $('#age').val();
    user.address = $('#address').val();
    // if (!required()) {
    //   return;
    // }
    if (handeMethod == 'POST') {
      delete user._id;
    }
    $.ajax({
      type: handeMethod,
      url: urlHandleUser,
      data: user,
      success: function (response) {
        if (response.code == 200) {
          if (handeMethod == 'PUT') {
            let user = response.data;
            let htmtResult = `<td>${user._id.slice(-4)}</td>
																	<td>${user.username}</td>
																	<td>${user.fullname}</td>
																	<td>${user.age}</td>
																	<td>${user.address}</td>
																	<td style="width: 200px">
																		<button data-action="/api/user/edit/${user._id}"
																		class="btn btn-success btn-edit-user"
																		style="width: 80px" data-handle="/api/user/update/${user._id}" data-bs-toggle="modal" data-bs-target="#modalHandleUser">
																			Edit
																		</button>
																		<button data-action="/api/user/delete/${
                                      user._id
                                    }" class="btn btn-danger btn-delete-user" style="width: 80px" data-bs-toggle="modal" data-bs-target="#exampleModal">
																			Delete
																		</button>
																	</td>`;
            trElement.html(htmtResult);
            Toastify({
              text: 'Successfully updated user:  ' + user.username,
              close: true,
              duration: 3000,
              style: {
                background: '#146c43',
              },
            }).showToast();
            $('#required').html('&nbsp;');
          } else {
            $.ajax({
              type: 'GET',
              url: '/api/list',
              success: function (response) {
                page = response.totalPages;
                pagination(page);
                showData(page);
                Toastify({
                  text: 'Successfully added!',
                  close: true,
                  duration: 3000,
                  style: {
                    background: '#0d6efd',
                  },
                }).showToast();
              },
            });
          }
          modalHandleUser.hide();
        } else {
          $('#required').text('*Fields cannot be left blank and age must be greater than 0!');
        }
      },
    });
  });
  //
  function showData(page) {
    $.ajax({
      type: 'get',
      url: '/api/page/' + page,
      success: function (response) {
        response.length == 1 ? (pageDanger = true) : (pageDanger = false);
        let htmlResult = '';
        response.forEach((user) => {
          htmlResult += `<tr>
																<td>${user._id.slice(-4)}</td>
																<td>${user.username}</td>
																<td>${user.fullname}</td>
																<td>${user.age}</td>
																<td>${user.address}</td>
																<td style="width: 200px">
																	<button data-action="/api/user/edit/${user._id}"
																	class="btn btn-success btn-edit-user"
																	style="width: 80px" data-handle="/api/user/update/${user._id}" data-bs-toggle="modal" data-bs-target="#modalHandleUser">
																		Edit
																	</button>
																	<button data-action="/api/user/delete/${
                                    user._id
                                  }" class="btn btn-danger btn-delete-user" style="width: 80px" data-bs-toggle="modal" data-bs-target="#exampleModal">
																		Delete
																	</button>
																</td>
															</tr>`;
        });
        $('#data-container').html(htmlResult);
      },
    });
  }
  //
  $('#btnDeleteAllUser').click(function (e) {
    deleteAll = true;
    e.preventDefault();
  });
  $('#btn-fake-data').click(function (e) {
    e.preventDefault();
    $.ajax({
      type: 'GET',
      url: '/fake-data',
      success: function (response) {
        Toastify({
          text: 'Create 100 more documents!',
          close: true,
          duration: 3000,
          style: {
            background: '#0d6efd',
          },
        }).showToast();
        page = 1;
        pagination(page);
        showData(page);
      },
    });
  });

  var modalHandleUser = new bootstrap.Modal($('#modalHandleUser'), {
    keyboard: false,
  });

  $('#modalHandleUser').on('shown.bs.modal', function () {
    $(this).find('input').first().focus();
  });
});
//
