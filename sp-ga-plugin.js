/*
 * Snowplow Google Analytics plugin.
 * 
 * Copyright (c) 2017-2017 Snowplow Analytics Ltd. All rights reserved.
 *
 * This program is licensed to you under the Apache License Version 2.0,
 * and you may not use this file except in compliance with the Apache License Version 2.0.
 * You may obtain a copy of the Apache License Version 2.0 at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the Apache License Version 2.0 is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Apache License Version 2.0 for the specific language governing permissions and
 * limitations there under.
 */

function SpGaPlugin(tracker, config) {
  this.endpoint = config.endpoint;

  var ga = getGA();
  var sht = 'sendHitTask';
  ga(function(tracker) {
    var originalSht = tracker.get(sht);
    tracker.set(sht, function(model) {
      var payload = model.get('hitPayload');
      originalSht(model);
      var request = new XMLHttpRequest();
      request.open('get', endpoint + '?' + payload, true);
      request.send();
    });
  });
}

function providePlugin(pluginName, pluginConstructor) {
  var ga = getGA();
  if (typeof ga == 'function') {
    ga('provide', pluginName, pluginConstructor);
  }
}

function getGA() {
  return window[window['GoogleAnalyticsObject'] || 'ga'];
}

providePlugin('spGaPlugin', SpGaPlugin);
