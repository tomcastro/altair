import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

// Import the codemirror packages
import Codemirror from 'codemirror';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror-graphql/hint';
import 'codemirror-graphql/lint';
import 'codemirror-graphql/mode';

@Component({
  selector: 'app-query-editor',
  templateUrl: './query-editor.component.html',
  styleUrls: ['./query-editor.component.scss']
})
export class QueryEditorComponent implements AfterViewInit {

  @Output() sendRequest = new EventEmitter();
  @Output() toggleHeaderDialog = new EventEmitter();

  _query = localStorage.getItem('altair:query');
  @Output() queryChange = new EventEmitter<string>();
  @Input()
  public set initialQuery(val: string){
    this._query = val;
    if (this.codeEditor) {
      this.codeEditor.setValue(val);
    }
  }

  codeEditor = null;
  @Input() showResult = false;
  @Input() gqlSchema = null;

  constructor() { }

  ngAfterViewInit() {
    const editorTextArea = document.querySelector('.app-query-editor-input');
    const editorOptions = <any>{
      mode: 'graphql',
      lineWrapping: true,
      lineNumbers: true,
      foldGutter: true,
      extraKeys: {
        'Cmd-Enter': (cm) => this.sendRequest.next(cm),
        'Ctrl-Space': 'autocomplete'
      },
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      autoCloseBrackets: true
    };

    if (this.gqlSchema) {
      console.log('Schema: ', this.gqlSchema);
      editorOptions.lint = {
        schema: this.gqlSchema
      };
      editorOptions.hintOptions = {
        schema: this.gqlSchema
      };
    }
    this.codeEditor = Codemirror.fromTextArea(editorTextArea, editorOptions);
    this.codeEditor.on('change', e => this.update(e));
  }

  update($event) {
    this.queryChange.next(this.codeEditor.getValue());
  }

}
