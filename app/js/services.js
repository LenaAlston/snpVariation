'use strict';

/* Services */

var geneVar = angular.module('geneVarApp', []);  // do I need that?

function showname(){
        var  file = document.fileform.uploadBox.value ;
        document.fileform.filename.value = file;
    }