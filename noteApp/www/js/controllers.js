angular.module('notes.controllers', ['notes.services'])

/// STEP 4 Useing State Parameter
.controller('NotesListController', function($scope, NoteService){
  $scope.notes = NoteService.getAllNotes();

  $scope.$watch(function(){
    return NoteService.getAllNotes();
  },
  function(newVal, oldVal){
    $scope.notes = newVal;
  }, true);

  $scope.deleteNote = function(id){
    NoteService.deleteNote(id);
  };
})

.controller('NoteController', function($scope, $ionicHistory, $ionicPopup, $stateParams, NoteService){

  var passedNoteId = $stateParams.noteid;
  $scope.note = NoteService.getNote(passedNoteId);

  /// STEP 2. Hading User input
  // $scope.myContent = 'Edit my Note';
  // $scope.note = {
  //   id:'',
  //   name:'',
  //   text:''
  // };

  /// STEP 3. Creating a Service ==> make service.js
  $scope.$watch(function(){   // angular function of watch to scope
    return $scope.note;
  },
  function(newVal, oldVal){
    $scope.saveNote();
  }, true);

  $scope.saveNote = function(){
    if($scope.note.id === ''){
      $scope.note.id = Math.random().toString(36).substring(9);
    }
    NoteService.updateNote($scope.note);
  };

  $scope.back = function(){
    if($scope.note.name !== ''){
      $scope.saveNote();
      $ionicHistory.goBack();
    }else{
      $ionicPopup.show({
        title:'Missing name',
        content:'Youur note has no name and will b deleted!',
        buttons:[{
          text: 'Delete note',
          type: 'button-assertive', // red color (assertive)
          onTap: function(e){
            $ionicHistory.goBack();
            NoteService.deleteNote($scope.note.id);
          }
        },{
            text: 'Add name',
            type: 'button-balanced' // green color (balanced)
        }]
      });
    }
    //console.log('back');
  };
});
