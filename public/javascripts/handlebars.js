function handlebars(){
  <script id="guideBioCard" type="text/x-handlebars-template" >
    <div class="row">
      <div class="guideInnerCard col-md-12">
        <div class="guideBioImage">
          <img src={{image}}></div>
          <h2>{{name}}</h2>
        <div class="scrolling">
          <p><span>Website:</span> {{website}}</p>
          {{#with post}}
          <p><span>Languages:</span> {{sentence}}</p>
          <p><span>Specialties:</span> {{sentence}}</p>
          <p><span>Interest:</span> {{sentence}}</p>
          <p><span>Bio:</span> {{paragraph}}{{paragraph}}{{paragraph}}{{paragraph}}{{paragraph}}{{paragraph}}{{paragraph}}{{paragraph}}{{paragraph}}</p>
        </div>  
        {{/with}}
        <button class="btn btn-info guideChatButton" id="" >Chat With Guide</button>
      </div>
    </div>
  </script>
  <script id="guideChatMessenger" type="text/x-handlebars-template">
      <div class="row">
          <div class="col-md-2 col-lg-2 messengerRight">
              <div class="panel panel-primary">
                  <div class="panel-heading">
                      <span class="glyphicon glyphicon-comment"> {{name}}</span>
                      <div class="btn-group pull-right">
                          <button type="button" class="btn btn-default btn-xs chevronButton" data-toggle="dropdown">
                              <span class="glyphicon glyphicon-chevron-down"></span> 
                          </button>
                          <button type="button" class="btn btn-default btn-xs removeButton" data-toggle="dropdown">
                              <span class="glyphicon glyphicon-remove"></span> 
                          </button>
                      </div>
                  </div>
                  <div class="panel-body">
                      <ul class="chat">
                          <li class="left clearfix">
                            <span class="chat-img pull-left">
                                <img src={{image}} alt="User Avatar" class="img-circle" />
                            </span>
                              <div class="chat-body clearfix">
                                  <div class="header">
                                      <strong class="primary-font">{{name}}</strong> 
                                      <small class="pull-right text-muted">
                                          <span class="glyphicon glyphicon-time"></span>12 mins ago
                                      </small>
                                  </div>
                                  <p>
                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare
                                      dolor, quis ullamcorper ligula sodales.
                                  </p>
                              </div>
                          </li>
                          <li class="right clearfix"><span class="chat-img pull-right">
                              <img src="http://placehold.it/50/FA6F57/fff&text=ME" alt="User Avatar" class="img-circle" />
                          </span>
                              <div class="chat-body clearfix">
                                  <div class="header">
                                      <small class=" text-muted"><span class="glyphicon glyphicon-time"></span>13 mins ago
                                      </small>
                                      <strong class="pull-right primary-font">Bhaumik Patel</strong>
                                  </div>
                                  <p>
                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare
                                      dolor, quis ullamcorper ligula sodales.
                                  </p>
                              </div>
                          </li>
                          <li class="left clearfix">
                            <span class="chat-img pull-left">
                                <img src="http://placehold.it/50/55C1E7/fff&text=U" alt="User Avatar" class="img-circle"/>
                            </span>
                              <div class="chat-body clearfix">
                                  <div class="header">
                                      <strong class="primary-font">Jack Sparrow</strong>
                                      <small class="pull-right text-muted">
                                          <span class="glyphicon glyphicon-time"></span>14 mins ago
                                      </small>
                                  </div>
                                  <p>
                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare
                                      dolor, quis ullamcorper ligula sodales.
                                  </p>
                              </div>
                          </li>
                          <li class="right clearfix">
                            <span class="chat-img pull-right">
                                <img src="http://placehold.it/50/FA6F57/fff&text=ME" alt="User Avatar" class="img-circle" />
                            </span>
                              <div class="chat-body clearfix">
                                  <div class="header">
                                      <small class=" text-muted">
                                        <span class="glyphicon glyphicon-time"></span>15 mins ago
                                      </small>
                                      <strong class="pull-right primary-font">Bhaumik Patel</strong>
                                  </div>
                                  <p>
                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare
                                      dolor, quis ullamcorper ligula sodales.
                                  </p>
                              </div>
                          </li>
                      </ul>
                  </div>
                  <div class="panel-footer">
                      <div class="input-group">
                          <input id="btn-input" type="text" class="form-control input-sm" placeholder="Type your message here..." />
                          <span class="input-group-btn">
                              <button class="btn btn-warning btn-sm" id="btn-chat">Send</button>
                          </span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </script>
}
