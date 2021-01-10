let $sort;

const card = (id, firstName, lastName, location, department, email) => {
    return (`
<div class=" card m-1  col-xl-2 shadow " style="width: 18rem;">
                <div class="row justify-content-between">
                    <span class="deleteBtn"><i class="fas fa-trash-alt "></i></span>
                    <span class="editBtn"><i id="" class="fas fa-edit"></i></span>
                </div>
                <div class="card-body">
                    <p class="id">${id}</p>
                    <h5 class="card-title"><span class="first">${firstName}</span> <span class="last">${lastName}</span></h5>
                    <p class="location card-text">${location}
                    </p>
                    <p class="department">${department}</p>
                    <a href="" class="email" style="font-size : .75rem; ">${email}</a>
                </div>
            </div>`);
};

const edit = () => (
    $('.editBtn').click(event => {

        $('#id').html($(event.currentTarget).parent().siblings().find('.id').html());
        $('#UfirstName').val($(event.currentTarget).parent().siblings().find('.first').html());
        $('#UlastName').val($(event.currentTarget).parent().siblings().find('.last').html());
        $('#Udepartment option').attr('selected', function () {
            $(this).prop("selected", false)

            if ($(this).text() == $(event.currentTarget).parent().siblings().find('.department').text()) {
                $(this).prop("selected", true)
            }
        });
        $('#Uemail').val($(event.currentTarget).parent().siblings().find('.email').html());

        $('#edit').show()
        $('.close, #close').click(function () {
            $('#edit').hide();
        });

        window.onclick = function (event) {
            if (event.target == $('#edit')) {
                $('#edit').hide();
            };
        };

    }));

const deletePersonnel = () => (
    $('.deleteBtn').click(event => {
        $('#deleteID').html($(event.currentTarget).parent().siblings().find('.id').html());

        $('#delete').show()
        $('.close, .cancel').click(function () {
            $('#delete').hide();
        });

        window.onclick = function (event) {
            if (event.target == $('#delete')) {
                $('#delete').hide();
            };
        };
    }));




$(document).ready(function () {

    $(window).scroll(function () {
        const $nav = $("#navbar");
        const $jumbo = $(".jumbotron");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $jumbo.height());
    })

    $('#add').click(function () {
        $('#create').show()
        $('.close').click(function () {
            $('#create').hide();
        });

        window.onclick = function (event) {
            if (event.target == $('#create')) {
                $('#create').hide();
            };
        };
    })

    $('#addDep').click(function () {
        $('#createDep').show()
        $('.close').click(function () {
            $('#createDep').hide();
        });

        window.onclick = function (event) {
            if (event.target == $('#createDep')) {
                $('#createDep').hide();
            };
        };
    })

    $('#addLoc').click(function () {
        $('#createLoc').show()
        $('.close').click(function () {
            $('#createLoc').hide();
        });

        window.onclick = function (event) {
            if (event.target == $('#createLoc')) {
                $('#createLoc').hide();
            };
        };
    })


    $(window).ready(function () {

        $.ajax({
            url: './libs/php/getAll.php',
            type: 'post',
            dataType: 'json',
            data: {
                sort: $('#sortList').val()
            },
            success: function (result) {

                result.data.forEach(employee => {

                    $('#main').append(card(employee.id, employee.firstName, employee.lastName, employee.location, employee.department, employee.email));

                });

                edit()
                deletePersonnel()


            }

        })

        $.ajax({
            url: './libs/php/getAllDepartments.php',
            type: 'post',
            dataType: 'json',
            success: function (result) {

                result.data.forEach(element => {

                    $('#depMenu').append(`<span class="depID">${element.id}</span><li class="pb-3 editDep">${element.name}</li><span class="locID">${element.locationID}</span>`)
                    $('#Cdepartment').append(`<option value="${element.id}">${element.name}</option>`);
                    $('#Udepartment').append(`<option value="${element.id}">${element.name}</option>`);



                });

                $('.editDep').click(event => {

                    $('#updateDep').show()
                    $('.close').click(function () {
                        $('#updateDep').hide();
                    });

                    window.onclick = function (event) {
                        if (event.target == $('#updateDep')) {
                            $('#updateDep').hide();
                        };
                    };


                    $('#depID').val($(event.currentTarget).prev().html())
                    $('#UdepName').val($(event.currentTarget).html())
                    $('#UdepLocation').val($(event.currentTarget).next().html())

                    $('#deleteDepBtn').click(() => {
                        $('#updateDep').hide();
                        $('#deleteDepName').html($(event.currentTarget).html());

                        $('#deleteDepMod').show()
                        $('.close, .cancel').click(function () {
                            $('#deleteDepMod').hide();
                        });

                        window.onclick = function (event) {
                            if (event.target == $('#deleteDepMod')) {
                                $('#deleteDepMod').hide();
                            };
                        };
                    })

                    $('#deleteDep').click(function () {

                        $.ajax({
                            url: './libs/php/deleteDepartmentByID.php',
                            type: 'post',
                            dataType: 'json',
                            data: {
                                id: $('#depID').val()
                            },
                            success: function (result) {
                                 
                                if (result.data === undefined || result.data.length == 0) {
                                    $('#deleteDepMod').hide();
                                    $('#message').text('You can\'t delete departments with more than 3 employee assigned to it!');
                                    $('#success').show();
                
                                    location.reload();

                                }
                            }

                        })
                    })



                });


                $('#updateDepBtn').click(function () {


                    $.ajax({
                        url: './libs/php/updateDepartment.php',
                        type: 'post',
                        dataType: 'json',
                        data: {
                            name: $('#UdepName').val(),
                            locID: $('#UdepLocation').val(),
                            id: $('#depID').val()
                        },
                        success: function (result) {

                            $('#updateDep').hide();
                                    $('#message').text('Department updated successfully!');
                                    $('#success').show();
                
                                    location.reload();
                        }

                    })
                })
            }
        });

        $.ajax({
            url: './libs/php/getAllLocations.php',
            type: 'post',
            dataType: 'json',
            success: function (result) {

                result.data.forEach(element => {

                    $('#locMenu').append(`<span class="locID">${element.id}</span><li class="pb-3 editLoc">${element.name}</li>`)
                    $('#depLocation').append(`<option value="${element.id}">${element.name}</option>`)
                    $('#UdepLocation').append(`<option value="${element.id}">${element.name}</option>`)

                });

                $('.editLoc').click(event => {

                    $('#updateLoc').show()
                    $('.close').click(function () {
                        $('#updateLoc').hide();
                    });

                    window.onclick = function (event) {
                        if (event.target == $('#updateLoc')) {
                            $('#updateLoc').hide();
                        };
                    };

                    $('#ULocName').val($(event.currentTarget).html());
                    $('#locID').html($(event.currentTarget).prev().html())




                    $('#deleteLocBtn').click(function () {

                        $('.deleteLocName').html($(event.currentTarget).html());
                        $('#updateLoc').hide();


                        $('#deleteLocMod').show()
                        $('.close, .cancel').click(function () {
                            
$('#deleteLocMod').hide();
                        });

                        window.onclick = function (event) {
                            if (event.target == $('#deleteLocMod')) {
                                $('#deleteLocMod').hide();
                            };
                        };


                    })
                });
                $('#updateLocBtn').click(function () {

                    $.ajax({
                        url: './libs/php/updateLocation.php',
                        type: 'post',
                        dataType: 'json',
                        data: {
                            name: $('#ULocName').val(),
                            id: $('#locID').html()
                        },
                        success: function () {
                            $('#updateLoc').hide();
                            $('#message').text('Location updated successfully!');
                            $('#success').show();
        
                            location.reload();
                        }
                    });
                })

                $('#deleteLoc').click(function () {

                    $.ajax({
                        url: './libs/php/deleteLocationByID.php',
                        type: 'post',
                        dataType: 'json',
                        data: {
                            id: $('#locID').html()
                        },
                        success: function (result) {

                            if (result.data === undefined || result.data.length == 0) {

                                $('#deleteLocMod').hide();

                            $('#message').text('You can\'t delete locations with departments assigned to it');
                            $('#success').show();
        
                            location.reload();

                            }
                        },

                        error: function (jqXHR, textStatus, errorThrown) {
                            // your error code
                            console.warn(jqXHR.responseText)
                            console.log(errorThrown);
                            console.log(textStatus);
                            console.log(jqXHR);
                        }

                    })
                })
            }
        })



    });

    $('#createBtn').click(function () {
        $.ajax({
            url: './libs/php/insertPersonnel.php',
            type: 'post',
            dataType: 'json',
            data: {
                firstName: $('#CfirstName').val(),
                lastName: $('#ClastName').val(),
                jobTitle: $('#jobTitle').val(),
                departmentID: $('#Cdepartment').val(),
                email: $('#Cemail').val(),

            },
            success: function (result) {

                $('#create').hide();
                if (result.status.code == 200) {

                            $('#message').text('Employee created successfully!');
                            $('#success').show();
        
                            location.reload();
                }


            },
            error: function (jqXHR, textStatus, errorThrown) {
                // your error code
                console.warn(jqXHR.responseText)
                console.log(errorThrown);
                console.log(textStatus);
                console.log(jqXHR);
            }
        });
    });

    $('#createDepBtn').click(function () {
        $.ajax({
            url: './libs/php/insertDepartment.php',
            type: 'post',
            dataType: 'json',
            data: {
                name: $('#depName').val(),
                locationID: $('#depLocation').val()
            },
            success: function (result) {

                $('#createDep').hide();
                if (result.status.code == 200) {

                    $('#message').text('Department created successfully!');
                    $('#success').show();

                    location.reload();
                }


            }
        });
    });

    $('#createLocBtn').click(function () {
        $.ajax({
            url: './libs/php/insertLocation.php',
            type: 'post',
            dataType: 'json',
            data: {
                name: $('#locName').val(),
            },
            success: function (result) {

                $('#createLoc').hide();
                if (result.status.code == 200) {
                    $('#message').text('Location created successfully!');
                    $('#success').show();

                    location.reload();
                }


            }
        });
    });



    $('#update').click(function () {
        $.ajax({
            url: './libs/php/updatePersonnel.php',
            type: 'post',
            dataType: 'json',
            data: {
                firstName: $('#UfirstName').val(),
                lastName: $('#UlastName').val(),
                departmentID: $('#Udepartment').val(),
                email: $('#Uemail').val(),
                id: $('#id').text()
            },
            success: function (result) {
                $('#edit').hide();
                $('#message').text('Employee information updated successfully!');
                $('#success').show();
                
                location.reload();

            },
            error: function (jqXHR, textStatus, errorThrown) {
                // your error code
                console.warn(jqXHR.responseText)
                console.log(errorThrown);
                console.log(textStatus);
                console.log(jqXHR);
            }
        });
    });

    $('#deleteBtn').click(function () {

        $.ajax({
            url: './libs/php/deletePersonnel.php',
            type: 'post',
            dataType: 'json',
            data: {
                id: $('#deleteID').text()
            },
            success: function (result) {

                if (result.status.code == 200) {
                    $('#delete').hide();
                    $('#message').text('Employee data successfully deleted!');
                    $('#success').show();

                    location.reload();
                }


            },
            error: function (jqXHR, textStatus, errorThrown) {
                // your error code
                console.warn(jqXHR.responseText)
                console.log(errorThrown);
                console.log(textStatus);
                console.log(jqXHR);
            }
        });

    })


    $('#sortMenu').children().click(function (event) {

        $.ajax({
            url: './libs/php/sortAll.php',
            type: 'post',
            dataType: 'json',
            data: {
                sort: $(event.currentTarget).attr('data-value')
            },
            success: function (result) {
                if ($('#main')) {
                    $('#main').html('');
                }
                result.data.forEach(employee => {

                    $('#main').append(card(employee.id, employee.firstName, employee.lastName, employee.location, employee.department, employee.email));

                });
                edit();
                deletePersonnel()

            },
            error: function (jqXHR, textStatus, errorThrown) {
                // your error code
                console.warn(jqXHR.responseText)
                console.log(errorThrown);
                console.log(textStatus);
                console.log(jqXHR);
            }
        })

    })


    $('#nameSearch').keyup(function () {

        $.ajax({
            url: './libs/php/getPersonnelByName.php',
            type: 'post',
            dataType: 'json',
            data: {
                name: $('#nameSearch').val()
            },
            success: function (result) {

                if ($('#main')) {
                    $('#main').html('');
                }
                result.data.forEach(employee => {


                    $('#main').append(card(employee.id, employee.firstName, employee.lastName, employee.location, employee.department, employee.email));

                });
                edit();
                deletePersonnel()
            }
        })
    })





});