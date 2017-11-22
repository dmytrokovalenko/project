$(function() {

  var $indicator = 0;
  var $indicatorOneAdd = 0;
  var $newTask = $('.newTask');
  var $createTask = $('.createTask');
  var $createTaskDOMFirst = '<div class="newTaskFull"><div class="headers newTaskFullHeader">NEW TASK</div><div class="newTaskFullDescription"><div class="newTaskFullDescription1"></div><div class="newTaskFullDescription2"></div><br><div class="newTaskFullDescription3"></div></div><div class="newTaskFullAddress"></div><button>CREATE TASK</button></div><div class="location"><div class="headers locationHeader">LOCATION</div><input type="text" placeholder="Your address"></input><button>ADD</button></div><div class="serviceType"><div class="headers serviceTypeHeader">SERVICE TYPE</div><div class="serviceTypeJobs"><div class="worker">Electrician</div><div class="worker">Plumber</div><div class="worker">Gardener</div><div class="worker">Housekeeper</div><div class="worker">Cook</div></div></div><div class="serviceTask"><div class="headers serviceTaskHeader">TASKS</div></div></div><div class="newTaskDescription"><div class="headers newTaskDescriptionHeader">TASK DESCRIPTION</div></div></div>';
  var $createTaskDOMSecond1 = '<div class="headers serviceTaskHeader">TASKS</div><div class="serviceTaskJobs"><div class="task todo1">Repair equipment</div><div class="task todo1">Diagnose system</div><div class="task todo1">Install equipment</div><div class="task todo2">Test system</div><div class="task todo2">Make scheme plan</div><div class="task todo2">Modify system</div></div>';
  var $createTaskDOMSecond2 = '<div class="headers serviceTaskHeader">TASKS</div><div class="serviceTaskJobs"><div class="task todo1">Unblock a toilet</div><div class="task todo1">Unblock a sink</div><div class="task todo1">Fix a water leak</div><div class="task todo2">Install a sink</div><div class="task todo2">Install a shower</div><div class="task todo2">Install a toilet</div></div>';
  var $createTaskDOMSecond3 = '<div class="headers serviceTaskHeader">TASKS</div><div class="serviceTaskJobs"><div class="task todo1">Cut off bushes</div><div class="task todo1">Cut lawn</div><div class="task todo1">Dig potatoes</div><div class="task todo2">Sweep the yard</div><div class="task todo2">Picking berries</div><div class="task todo2">Plant trees</div></div>';
  var $createTaskDOMSecond4 = '<div class="headers serviceTaskHeader">TASKS</div><div class="serviceTaskJobs"><div class="task todo1">Iron clothes</div><div class="task todo1">Wash</div><div class="task todo1">Clean up</div><div class="task todo2">Go shopping</div><div class="task todo2">Cook</div><div class="task todo2">Drink beer with</div></div>';
  var $createTaskDOMSecond5 = '<div class="headers serviceTaskHeader">TASKS</div><div class="serviceTaskJobs"><div class="task todo1">Prepare banquet</div><div class="task todo1">Cook</div><div class="task todo1">Make cake</div><div class="task todo2">Make lasagna</div><div class="task todo2">Taste food</div><div class="task todo2">Drink beer with</div></div>';
  var $createTaskDOMThird = '<div class="headers newTaskDescriptionHeader">TASK DESCRIPTION</div><input type="text" placeholder="Describe the issue" maxlength="50"></input><button>ADD</button>';
  var $createTaskDOMFourth = '<div class="job"><div class="jobDate"></div><div class="jobDescription"></div><div class="jobButtons"><button>EDIT</button><button>DELETE</button></div></div>';

  $newTask.on('click', showTaskCreator);

  function showTaskCreator() {

    $indicatorOneAdd = 0;
    $indicatorOneAdd = 0;
    $createTask.html($createTaskDOMFirst);

    var $addAddr = $('.location button');
    var $serviceTypeJobs = $('.serviceTypeJobs');

    $addAddr.on('click', getAddressFilled);
    $serviceTypeJobs.on('click', getWorker);

  }

  function getTaskCreated() {

    $indicator++;
    
    var $textInput = $('.newTaskDescription input');
    var $taskToServer = $('.newTaskFull button');
    if ($indicator === 1) {
      $('.newTaskFullDescription3').html($textInput.val());
      $taskToServer.on('click', getFromServer);
    }
  }

  function getAddressFilled() {

    var $newTaskFullAddress = $('.newTaskFullAddress');
    var $addrInput = $('.location input');

    $newTaskFullAddress.html('My address is ' + $addrInput.val());

  }

  function getWorker(event) {

    var $serviceTask = $('.serviceTask');

    if (event.target.tagName === 'DIV') {

      $('.worker').css('border', '1px solid white');
      $(event.target).css('border', '1px solid #2B60DE');
      $(event.target).css('border-radius', '15px');

      var $string = 'I need a ';
      var $firstLetter = $(event.target).html().substring(0, 1).toLowerCase();
      var $otherLetters = $(event.target).html().substring(1);

      switch ($(event.target).html()) {
        case 'Electrician':
          makeEmpty();
          $('.newTaskFullDescription1').html('I need an ' + $firstLetter + $otherLetters);
          $serviceTask.html($createTaskDOMSecond1);
          break;
        case 'Plumber':
          makeEmpty();
          $('.newTaskFullDescription1').html($string + $firstLetter + $otherLetters);
          $serviceTask.html($createTaskDOMSecond2);
          break;
        case 'Gardener':
          makeEmpty();
          $('.newTaskFullDescription1').html($string + $firstLetter + $otherLetters);
          $serviceTask.html($createTaskDOMSecond3);
          break;
        case 'Housekeeper':
          makeEmpty();
          $('.newTaskFullDescription1').html($string + $firstLetter + $otherLetters);
          $serviceTask.html($createTaskDOMSecond4);
          break;
        case 'Cook':
          makeEmpty();
          $('.newTaskFullDescription1').html($string + $firstLetter + $otherLetters);
          $serviceTask.html($createTaskDOMSecond5);
          break;
      }
    }

    var $serviceTaskJobs = $('.serviceTaskJobs');
    $serviceTaskJobs.on('click', getTask);

  }

  function getTask(event) {

    $('.task').css('border', '1px solid white');
    $(event.target).css('border', '1px solid #2B60DE');
    $(event.target).css('border-radius', '15px');

    var $newTaskDescription = $('.newTaskDescription');

    if (event.target.tagName === 'DIV') {
      $('.newTaskFullDescription2').html('to ' + $(event.target).html().substring(0, 1).toLowerCase() + $(event.target).html().substring(1) + '.'); //Grammar things
      $newTaskDescription.html($createTaskDOMThird);
    }

    var $addDesc = $('.newTaskDescription button');
    $addDesc.on('click', getTaskCreated);
    $addDesc.on('click', postToServer);
  }

  function makeEmpty() {

    $('.newTaskFullDescription2').empty();
    $('.newTaskFullDescription3').empty();

  }

  function getFromServer() {

    $indicator = 0;
    $createTask.empty();

    var ajaxGet = new XMLHttpRequest();
    ajaxGet.open('GET', 'http://localhost:3333/', true);
    ajaxGet.send();
    ajaxGet.addEventListener('readystatechange', function() {
      if (ajaxGet.readyState === 4 && ajaxGet.status == 200) {

        $('.edit').empty();

        var resultFirst = JSON.parse(ajaxGet.responseText);
        var $edit = $('.edit');

        for (var i = 0; i < resultFirst.length; i++) {

          $edit.append($createTaskDOMFourth);
          $('.job:last-child .jobDescription').html(resultFirst[i].description);
          $('.job:last-child .jobDate').html(resultFirst[i].date);
        }

      } else console.log(ajaxGet.status + ajaxGet.readyState);
    });


  }

  function postToServer() {

    $indicatorOneAdd++;
    if ($indicatorOneAdd === 1) {
      var $newTaskFullDescription1 = $('.newTaskFullDescription1');
      var $newTaskFullDescription2 = $('.newTaskFullDescription2');
      var $newTaskFullDescription3 = $('.newTaskFullDescription3');
      var $addrInput = $('.location input');
      var $showDateNow = String(new Date());
      var taskObject = {
        description: $newTaskFullDescription1.html() + ' ' + $newTaskFullDescription2.html() + ' ' + $newTaskFullDescription3.html(),
        address: $addrInput.val(),
        date: $showDateNow.substring(0, 24)
      };
      var jsonic = JSON.stringify(taskObject);

      var createXHR = new XMLHttpRequest();
      createXHR.open('POST', 'http://localhost:3333/', true);
      createXHR.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      createXHR.send(jsonic);

    }
  }

  $('.edit').on('click', editDescription);
  var $indicatorEdit = 0;

  function editDescription(event) {
    if ($indicatorEdit === 0) {
      
      $indicatorEdit = 1;
      
      if (event.target.tagName === 'BUTTON') {

        switch ($(event.target).html()) {
          case 'EDIT':
			$('.edit button:first-child').css('background-color', 'grey');
            var desc = $(event.target).parent().prev().html();
            var dat = $(event.target).parent().prev().prev().html();
            $('.correct').append('<div class="newDescription"><input type="text"></input><button>CHANGE</button></div>');

            $('.newDescription button').on('click', function() {
              $indicatorEdit = 0;
              $('.edit button:first-child').css('background-color', '#1589FF');
              var desc1 = $('.newDescription input').val();
              var descObject = {
                oldDesc: desc,
                newDesc: desc1,
                dateCheck: dat
              };
              var jsonic1 = JSON.stringify(descObject);
              
              var createDescXHR = new XMLHttpRequest();
              createDescXHR.open('PUT', 'http://localhost:3333/', false);
              createDescXHR.setRequestHeader('Content-type', 'application/json; charset=utf-8');
              createDescXHR.send(jsonic1);

              $('.correct').empty();
              getFromServer();
            })

            break;
          case 'DELETE':
		  $indicatorEdit = 0;
            var descD = $(event.target).parent().prev().html();
            var datD = $(event.target).parent().prev().prev().html();
            
               var descObject2 = {
                oldDesc: descD,
                dateCheck: datD
              };
              var jsonic2 = JSON.stringify(descObject2);
              
              var createDescXHR2 = new XMLHttpRequest();
              createDescXHR2.open('DELETE', 'http://localhost:3333/', false);
              createDescXHR2.setRequestHeader('Content-type', 'application/json; charset=utf-8');
              createDescXHR2.send(jsonic2);

              $('.correct').empty();
              getFromServer();
            
            break;
        }
      }
    }
  }


})
