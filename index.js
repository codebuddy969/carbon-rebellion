function getColor(number) {
    if (number < 300) {
        return 'red'
    } else if(number > 300 && number < 600) {
        return 'orange'
    } else if(number > 400 && number < 1000) {
        return 'green'
    } else {
        return ''
    }
}

$.fn.dataTable.ext.search.push(
    function (settings, data) {
        var min = parseInt($('#min-target').val(), 10);
        var max = parseInt($('#max-target').val(), 10);
        var age = parseFloat(data[7]) || 0;

        if ((isNaN(min) && isNaN(max)) ||
            (isNaN(min) && age <= max) ||
            (min <= age && isNaN(max)) ||
            (min <= age && age <= max)) {
            return true;
        }
        return false;
    }
);

$(function () {

    var jsonData = [
        {
            "id": "1",
            "switch": "true",
            "branch": {
                "name":"Electrabel",
                "type":"Gas",
            },
            "campaign": "BE - Summer Deal Elec",
            "status": {
                "type":"true",
                "rank":"1/50",
            },
            "start": {
                "date":"14/07/2019",
                "time":"00:00",
            },
            "end": {
                "date":"14/07/2019",
                "time":"00:00",
            },
            "target": "200",
            "result": "500",
            "budget": "30,000",
            "spent": "800",
            "cr": "30"
        },
        {
            "id": "2",
            "switch": "false",
            "branch": {
                "name":"Electrabel",
                "type":"Electricity",
            },
            "campaign": "FR - Summer Deal Elec",
            "status": {
                "type":"true",
                "rank":"1/20",
            },
            "start": {
                "date":"14/07/2019",
                "time":"00:00",
            },
            "end": {
                "date":"14/07/2019",
                "time":"00:00",
            },
            "target": "500",
            "result": "900",
            "budget": "30,000",
            "spent": "0",
            "cr": "30"
        },
        {
            "id": "3",
            "switch": "false",
            "branch": {
                "name":"Electrabel",
                "type":"Gas",
            },
            "campaign": "BE - July Deal Elec",
            "status": {
                "type":"false"
            },
            "start": {
                "date":"14/07/2019",
                "time":"00:00",
            },
            "end": {
                "date":"14/07/2019",
                "time":"00:00",
            },
            "target": "1000",
            "result": "210",
            "budget": "30,000",
            "spent": "315",
            "cr": "-"
        }
    ];

    var dtTable = $('#table').DataTable({
        "data": jsonData,
        "sDom": 't',
        "paging": false,
        "ordering": false,
        "info": false,
        "responsive": {
            "breakpoints": [
                { "name": 'desktop', "width": Infinity },
                { "name": 'tablet',  "width": 1400 },
                { "name": 'fablet',  "width": 1024 },
                { "name": 'phone',   "width": 580 }
            ]
        },
        "columns": [
            {
                "data": 'check',
                "render": function ( data, type, full ) {
                    return (
                        '<div class="checkbox">'+
                        '    <input type="checkbox" id="checkbox-'+ full.id +'">'+
                        '    <label class="checkbox-label" for="checkbox-'+ full.id +'"></label>'+
                        '</div>'
                    );
                }
            },
            {
                "data": 'switch',
                "render": function ( data, type, full ) {
                    var status = full.switch == 'true' ? 'active' : 'hello';
                    return (
                        '<div class="switch">'+
                        '    <input type="checkbox" id="switch-'+ full.id +'">'+
                        '    <label class="switch-label '+ status +'" for="switch-'+ full.id +'"></label>'+
                        '</div>'
                    );
                }
            },
            {
                "data": 'branch',
                "render": function ( data, type, full ) {
                    return (
                        '<div class="branch-name">'+ full.branch.name +'</div>'+
                        '<div class="branch-type">'+ full.branch.type +'</div>'
                    );
                }
            },
            {
                "data": 'campaign',
                "render": function ( data, type, full ) {
                    return '<div class="campaign-name">'+ full.campaign +'</div>';
                }
            },
            {
                "data": 'status',
                "render": function ( data, type, full ) {
                    return (
                        full.status.type == 'true'
                            ? '<div class="status active">Active <span>Rank: '+ full.status.rank +'</span></div>'
                            : '<div class="status inactive">Inactive</div>'
                    );
                }
            },
            {
                "data": 'start',
                "render": function ( data, type, full ) {
                    return (
                        '<p>'+ full.start.date +'</p>'+
                        '<p>'+ full.start.time +'</p>'
                    );
                }
            },
            {
                "data": 'end',
                "render": function ( data, type, full ) {
                    return (
                        '<p>'+ full.end.date +'</p>'+
                        '<p>'+ full.end.time +'</p>'
                    );
                }
            },
            {"data": 'target'},
            {
                "data": 'result',
                "render": function ( data, type, full ) {
                    return (
                        '<div class="result-bar">'+
                            '<cite class="result-counter">'+ full.result +'</cite>'+
                            '<div class="'+ getColor(parseInt(full.result)) +'">'+
                            '    <span style="width: '+ full.result / 10 +'%"></span>'+
                            '</div>'+
                            '<p>'+ full.result / 10 +'%</p>'+
                        '</div>'
                    )
                }
            },
            {"data": 'budget'},
            {
                "data": 'spent',
                "render": function ( data, type, full ) {
                    return (
                        '<div class="result-bar">'+
                            '<cite class="result-counter">'+ full.spent +'</cite>'+
                            '<div class="'+ getColor(parseInt(full.spent)) +'">'+
                            '    <span style="width: '+ full.spent / 10 +'%"></span>'+
                            '</div>'+
                            '<p>'+ full.spent / 10 +'%</p>'+
                        '</div>'
                    )
                }
            },
            {"data": 'cr'}
        ]
    });

    $('#search').keyup(function () {
        dtTable.search($(this).val()).draw();
    });

    $('#min-target, #max-target').keyup(function () {
        dtTable.draw();
    });

    $('.navigation-slide').click(function () {
        $(this).toggleClass('active').find('ul').slideToggle("slow");
    });

    $('.dropdown-trigger').click(function () {
        $(this).toggleClass('active').parent().find('ul').toggle();
    });

    $('.switch-label, .checkbox-label').click(function () {
        $(this).toggleClass('active');
    });

    $('#header-check-label').click(function () {
        var condition = $(this).hasClass('active');
        $('tbody').find('.checkbox').each(function (index, element) {
            if (condition) {
                $(element).find('label').addClass('active');
                $(element).find('input').attr('Checked','Checked');
            } else {
                $(element).find('label').removeClass('active');
                $(element).find('input').removeAttr('Checked');
            }
        });
    });

    $('.burger').click(function () {
        $('aside').toggleClass('active');
    });

});
