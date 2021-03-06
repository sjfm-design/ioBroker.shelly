/* jshint -W097 */
/* jshint -W030 */
/* jshint strict:true */
/* jslint node: true */
/* jslint esversion: 6 */
'use strict';

const shellyHelper = require('../shelly-helper');

/**
 * Shelly Switch PM 1 / SHSW-PM / shelly1pm
 * CoAP:
 *  {"blk":[{"I":0,"D":"Relay0"},{"I":1,"D":"Sensors"}],"sen":[{"I":111,"T":"P","D":"Power","R":"0/3500","L":0},{"I":112,"T":"S","D":"State","R":"0/1","L":0},{"I":113,"T":"T","D":"Temperature C","R":"-40/300","L":0},{"I":114,"T":"T","D":"Temperature F","R":"-40/300","L":0},{"I":115,"T":"S","D":"Overtemp","R":"0/1","L":0},{"I":118,"T":"S","D":"Input","R":"0(off)/1(on)/2(longpush)","L":0},{"I":211,"T":"S","D":"Energy counter 0 [W-min]","L":0},{"I":212,"T":"S","D":"Energy counter 1 [W-min]","L":0},{"I":213,"T":"S","D":"Energy counter 2 [W-min]","L":0},{"I":214,"T":"S","D":"Energy counter total [W-min]","L":0}]}
  *
 * CoAP Version >= 1.8
 *  Shelly 1PM SHSW-PM with-dht22:    {"blk":[{"I":1,"D":"relay_0"},{"I":2,"D":"sensor_0"},{"I":3,"D":"sensor_1"},{"I":4,"D":"sensor_2"},{"I":5,"D":"device"}],"sen":[{"I":9103,"T":"EVC","D":"cfgChanged","R":"U16","L":5},{"I":1101,"T":"S","D":"output","R":"0/1","L":1},{"I":2101,"T":"S","D":"input","R":"0/1","L":1},{"I":2102,"T":"EV","D":"inputEvent","R":["S/L",""],"L":1},{"I":2103,"T":"EVC","D":"inputEventCnt","R":"U16","L":1},{"I":4101,"T":"P","D":"power","U":"W","R":["0/3500","-1"],"L":1},{"I":4103,"T":"E","D":"energy","U":"Wmin","R":["U32","-1"],"L":1},{"I":6102,"T":"A","D":"overpower","R":["0/1","-1"],"L":1},{"I":6109,"T":"P","D":"overpowerValue","U":"W","R":["U32","-1"],"L":1},{"I":3104,"T":"T","D":"deviceTemp","U":"C","R":["-40/300","999"],"L":5},{"I":3105,"T":"T","D":"deviceTemp","U":"F","R":["-40/572","999"],"L":5},{"I":6101,"T":"A","D":"overtemp","R":["0/1","-1"],"L":5},{"I":3101,"T":"T","D":"extTemp","U":"C","R":["-55/125","999"],"L":2},{"I":3102,"T":"T","D":"extTemp","U":"F","R":["-67/257","999"],"L":2},{"I":3201,"T":"T","D":"extTemp","U":"C","R":["-55/125","999"],"L":3},{"I":3202,"T":"T","D":"extTemp","U":"F","R":["-67/257","999"],"L":3},{"I":3301,"T":"T","D":"extTemp","U":"C","R":["-55/125","999"],"L":4},{"I":3302,"T":"T","D":"extTemp","U":"F","R":["-67/257","999"],"L":4},{"I":3103,"T":"H","D":"humidity","R":["0/100","999"],"L":2},{"I":3117,"T":"S","D":"extInput","R":"0/1","L":2}]}
 *  Shelly 1PM SHSW-PM no-addon:      {"blk":[{"I":1,"D":"relay_0"},{"I":2,"D":"sensor_0"},{"I":3,"D":"sensor_1"},{"I":4,"D":"sensor_2"},{"I":5,"D":"device"}],"sen":[{"I":9103,"T":"EVC","D":"cfgChanged","R":"U16","L":5},{"I":1101,"T":"S","D":"output","R":"0/1","L":1},{"I":2101,"T":"S","D":"input","R":"0/1","L":1},{"I":2102,"T":"EV","D":"inputEvent","R":["S/L",""],"L":1},{"I":2103,"T":"EVC","D":"inputEventCnt","R":"U16","L":1},{"I":4101,"T":"P","D":"power","U":"W","R":["0/3500","-1"],"L":1},{"I":4103,"T":"E","D":"energy","U":"Wmin","R":["U32","-1"],"L":1},{"I":6102,"T":"A","D":"overpower","R":["0/1","-1"],"L":1},{"I":6109,"T":"P","D":"overpowerValue","U":"W","R":["U32","-1"],"L":1},{"I":3104,"T":"T","D":"deviceTemp","U":"C","R":["-40/300","999"],"L":5},{"I":3105,"T":"T","D":"deviceTemp","U":"F","R":["-40/572","999"],"L":5},{"I":6101,"T":"A","D":"overtemp","R":["0/1","-1"],"L":5},{"I":3101,"T":"T","D":"extTemp","U":"C","R":["-55/125","999"],"L":2},{"I":3102,"T":"T","D":"extTemp","U":"F","R":["-67/257","999"],"L":2},{"I":3201,"T":"T","D":"extTemp","U":"C","R":["-55/125","999"],"L":3},{"I":3202,"T":"T","D":"extTemp","U":"F","R":["-67/257","999"],"L":3},{"I":3301,"T":"T","D":"extTemp","U":"C","R":["-55/125","999"],"L":4},{"I":3302,"T":"T","D":"extTemp","U":"F","R":["-67/257","999"],"L":4},{"I":3103,"T":"H","D":"humidity","R":["0/100","999"],"L":2},{"I":3117,"T":"S","D":"extInput","R":"0/1","L":2}]}
 *  Shelly 1PM SHSW-PM with-ds1820:   {"blk":[{"I":1,"D":"relay_0"},{"I":2,"D":"sensor_0"},{"I":3,"D":"sensor_1"},{"I":4,"D":"sensor_2"},{"I":5,"D":"device"}],"sen":[{"I":9103,"T":"EVC","D":"cfgChanged","R":"U16","L":5},{"I":1101,"T":"S","D":"output","R":"0/1","L":1},{"I":2101,"T":"S","D":"input","R":"0/1","L":1},{"I":2102,"T":"EV","D":"inputEvent","R":["S/L",""],"L":1},{"I":2103,"T":"EVC","D":"inputEventCnt","R":"U16","L":1},{"I":4101,"T":"P","D":"power","U":"W","R":["0/3500","-1"],"L":1},{"I":4103,"T":"E","D":"energy","U":"Wmin","R":["U32","-1"],"L":1},{"I":6102,"T":"A","D":"overpower","R":["0/1","-1"],"L":1},{"I":6109,"T":"P","D":"overpowerValue","U":"W","R":["U32","-1"],"L":1},{"I":3104,"T":"T","D":"deviceTemp","U":"C","R":["-40/300","999"],"L":5},{"I":3105,"T":"T","D":"deviceTemp","U":"F","R":["-40/572","999"],"L":5},{"I":6101,"T":"A","D":"overtemp","R":["0/1","-1"],"L":5},{"I":3101,"T":"T","D":"extTemp","U":"C","R":["-55/125","999"],"L":2},{"I":3102,"T":"T","D":"extTemp","U":"F","R":["-67/257","999"],"L":2},{"I":3201,"T":"T","D":"extTemp","U":"C","R":["-55/125","999"],"L":3},{"I":3202,"T":"T","D":"extTemp","U":"F","R":["-67/257","999"],"L":3},{"I":3301,"T":"T","D":"extTemp","U":"C","R":["-55/125","999"],"L":4},{"I":3302,"T":"T","D":"extTemp","U":"F","R":["-67/257","999"],"L":4},{"I":3103,"T":"H","D":"humidity","R":["0/100","999"],"L":2},{"I":3117,"T":"S","D":"extInput","R":"0/1","L":2}]}
 *  Shelly 1PM SHSW-PM with-lp-input: {"blk":[{"I":1,"D":"relay_0"},{"I":2,"D":"sensor_0"},{"I":3,"D":"sensor_1"},{"I":4,"D":"sensor_2"},{"I":5,"D":"device"}],"sen":[{"I":9103,"T":"EVC","D":"cfgChanged","R":"U16","L":5},{"I":1101,"T":"S","D":"output","R":"0/1","L":1},{"I":2101,"T":"S","D":"input","R":"0/1","L":1},{"I":2102,"T":"EV","D":"inputEvent","R":["S/L",""],"L":1},{"I":2103,"T":"EVC","D":"inputEventCnt","R":"U16","L":1},{"I":4101,"T":"P","D":"power","U":"W","R":["0/3500","-1"],"L":1},{"I":4103,"T":"E","D":"energy","U":"Wmin","R":["U32","-1"],"L":1},{"I":6102,"T":"A","D":"overpower","R":["0/1","-1"],"L":1},{"I":6109,"T":"P","D":"overpowerValue","U":"W","R":["U32","-1"],"L":1},{"I":3104,"T":"T","D":"deviceTemp","U":"C","R":["-40/300","999"],"L":5},{"I":3105,"T":"T","D":"deviceTemp","U":"F","R":["-40/572","999"],"L":5},{"I":6101,"T":"A","D":"overtemp","R":["0/1","-1"],"L":5},{"I":3101,"T":"T","D":"extTemp","U":"C","R":["-55/125","999"],"L":2},{"I":3102,"T":"T","D":"extTemp","U":"F","R":["-67/257","999"],"L":2},{"I":3201,"T":"T","D":"extTemp","U":"C","R":["-55/125","999"],"L":3},{"I":3202,"T":"T","D":"extTemp","U":"F","R":["-67/257","999"],"L":3},{"I":3301,"T":"T","D":"extTemp","U":"C","R":["-55/125","999"],"L":4},{"I":3302,"T":"T","D":"extTemp","U":"F","R":["-67/257","999"],"L":4},{"I":3103,"T":"H","D":"humidity","R":["0/100","999"],"L":2},{"I":3117,"T":"S","D":"extInput","R":"0/1","L":2}]}
 */
let shelly1pm = {
  'Relay0.Switch': {
    coap: {
      coap_publish: '1101', // Coap >= FW 1.8
      coap_publish_funct: (value) => { return value === 1 ? true : false; },
      http_cmd: '/relay/0',
      http_cmd_funct: (value) => { return value === true ? { turn: 'on' } : { turn: 'off' }; },
    },
    mqtt: {
      mqtt_publish: 'shellies/shelly1pm-<deviceid>/relay/0',
      mqtt_publish_funct: (value) => { return value === 'on'; },
      mqtt_cmd: 'shellies/shelly1pm-<deviceid>/relay/0/command',
      mqtt_cmd_funct: (value) => { return value === true ? 'on' : 'off'; },
    },
    common: {
      'name': 'Switch',
      'type': 'boolean',
      'role': 'switch',
      'read': true,
      'write': true,
      'def': false
    }
  },
  'Relay0.Input': {
    coap: {
      coap_publish: '2101', // Coap >= FW 1.8
      coap_publish_funct: (value) => { return value === 1 || value === 2 ? true : false; },
    },
    mqtt: {
      mqtt_publish: 'shellies/shelly1pm-<deviceid>/input/0',
      mqtt_publish_funct: (value) => { return value == 1 ? true : false; },
    },
    common: {
      'name': 'Input / Detach',
      'type': 'boolean',
      'role': 'state',
      'read': true,
      'write': false,
      'def': false
    }
  },
  'Relay0.longpush': {
    coap: {
      coap_publish: '2102', // CoAP >= FW 1.8
      coap_publish_funct: (value) => { return value === 2 ? true : false; }
    },
    mqtt: {
      mqtt_publish: 'shellies/shelly1pm-<deviceid>/longpush/0',
      mqtt_publish_funct: (value) => { return value == 1 ? true : false; },
    },
    common: {
      'name': 'Longpush',
      'type': 'boolean',
      'role': 'state',
      'read': true,
      'write': false,
      'def': false
    }
  },
  'Relay0.AutoTimerOff': {
    coap: {
      http_publish: '/settings',
      http_publish_funct: (value) => { return value ? JSON.parse(value).relays[0].auto_off : undefined; },
      http_cmd: '/settings/relay/0',
      http_cmd_funct: (value) => { return { auto_off: value }; }
    },
    mqtt: {
      http_publish: '/settings',
      http_publish_funct: (value) => { return value ? JSON.parse(value).relays[0].auto_off : undefined; },
      http_cmd: '/settings/relay/0',
      http_cmd_funct: (value) => { return { auto_off: value }; }
    },
    common: {
      'name': 'Auto Timer Off',
      'type': 'number',
      'role': 'level.timer',
      'def': 0,
      'unit': 's',
      'read': true,
      'write': true
    }
  },
  'Relay0.AutoTimerOn': {
    coap: {
      http_publish: '/settings',
      http_publish_funct: (value) => { return value ? JSON.parse(value).relays[0].auto_on : undefined; },
      http_cmd: '/settings/relay/0',
      http_cmd_funct: (value) => { return { auto_on: value }; }
    },
    mqtt: {
      http_publish: '/settings',
      http_publish_funct: (value) => { return value ? JSON.parse(value).relays[0].auto_on : undefined; },
      http_cmd: '/settings/relay/0',
      http_cmd_funct: (value) => { return { auto_on: value }; }
    },
    common: {
      'name': 'Auto Timer Off',
      'type': 'number',
      'role': 'level.timer',
      'def': 0,
      'unit': 's',
      'read': true,
      'write': true
    }
  },
  'Relay0.Power': {
    coap: {
      coap_publish: '4101', // CoAP >= FW 1.8
      coap_publish_funct: (value) => { return (Math.round(value * 100) / 100); }
    },
    mqtt: {
      mqtt_publish: 'shellies/shelly1pm-<deviceid>/relay/0/power',
      mqtt_publish_funct: (value) => { return (Math.round(value * 100) / 100); }
    },
    common: {
      'name': 'Power',
      'type': 'number',
      'role': 'value.power',
      'read': true,
      'write': false,
      'def': 0,
      'unit': 'W'
    }
  },
  'Relay0.Energy': {
    coap: {
      coap_publish: '4103', // CoAP >= FW 1.8
      coap_publish_funct: (value) => { return (Math.round((value / 60 ) * 100) / 100); }
    },
    mqtt: {
      mqtt_publish: 'shellies/shelly1pm-<deviceid>/relay/0/energy',
      mqtt_publish_funct: (value) => { return Math.round((value / 60) * 100) / 100; }
    },
    common: {
      'name': 'Energy',
      'type': 'number',
      'role': 'value.power',
      'read': true,
      'write': false,
      'def': 0,
      'unit': 'Wh'
    }
  },
  'Relay0.ButtonType': {
    coap: {
      http_publish: '/settings',
      http_cmd: '/settings/relay/0',
      http_publish_funct: (value) => { return value ? JSON.parse(value).relays[0].btn_type : undefined; },
      http_cmd_funct: (value) => { return { btn_type: value }; }
    },
    mqtt: {
      http_publish: '/settings',
      http_cmd: '/settings/relay/0',
      http_publish_funct: (value) => { return value ? JSON.parse(value).relays[0].btn_type : undefined; },
      http_cmd_funct: (value) => { return { btn_type: value }; }
    },
    common: {
      'name': 'Button Type',
      'type': 'string',
      'role': 'state',
      'read': true,
      'write': true,
      'states': 'momentary:momentary;toggle:toggle;edge:edge;detached:detached;action:action;cycle:cycle;momentary_on_release:momentary_on_release'
    }
  },
  'Relay0.ButtonReverse': {
    coap: {
      http_publish: '/settings',
      http_cmd: '/settings/relay/0',
      http_publish_funct: (value) => { return value ? JSON.parse(value).relays[0].btn_reverse : undefined; },
      http_cmd_funct: (value) => { return { btn_reverse: value }; }
    },
    mqtt: {
      http_publish: '/settings',
      http_cmd: '/settings/relay/0',
      http_publish_funct: (value) => { return value ? JSON.parse(value).relays[0].btn_reverse : undefined; },
      http_cmd_funct: (value) => { return { btn_reverse: value }; }
    },
    common: {
      'name': 'Button Type',
      'type': 'number',
      'role': 'state',
      'read': true,
      'write': true,
      'states': '0:normal;1:inverted'
    }
  },
  'temperature': {
    coap: {
      coap_publish: '3104', // CoAP >= FW 1.8
      //coap_publish_funct: (value) => { return value; }
        },
    mqtt: {
      mqtt_publish: 'shellies/shelly1pm-<deviceid>/temperature',
    },
    common: {
      'name': 'Temperature',
      'type': 'number',
      'role': 'value.temperature',
      'read': true,
      'write': false,
      'unit': '°C',
      'min': -100,
      'max': 100
    }
  },
  'overtemperature': {
    coap: {
      coap_publish: '6101', // CoAP >= FW 1.8
      coap_publish_funct: (value) => { return value == 1 ? true : false; }
    },
    mqtt: {
      mqtt_publish: 'shellies/shellyplug-s-<deviceid>/overtemperature',
      mqtt_publish_funct: (value) => { return value == 1 ? true : false; },
    },
    common: {
      'name': 'Temperature',
      'type': 'boolean',
      'role': 'state',
      'read': true,
      'write': false
    }
  },
  'ext.temperatureC1': {
    coap: {
      coap_publish: '3101', // CoAP >= FW 1.8
      //coap_publish_funct: (value) => { return value; }
    },
    mqtt: {
      mqtt_publish: 'shellies/shelly1pm-<deviceid>/ext_temperature/0',
      mqtt_publish_funct: (value) => { return String(value).replace(/[^0-9\.]/g, ''); }
    },
    common: {
      'name': 'External Temperature',
      'type': 'number',
      'role': 'value.temperature',
      'unit': '°C',
      'read': true,
      'write': false
    }
  },
  'ext.temperatureC2': {
    coap: {
      coap_publish: '3201', // CoAP >= FW 1.8
      //coap_publish_funct: (value) => { return value; }
    },
    mqtt: {
      mqtt_publish: 'shellies/shelly1pm-<deviceid>/ext_temperature/1',
      mqtt_publish_funct: (value) => { return String(value).replace(/[^0-9\.]/g, ''); }
    },
    common: {
      'name': 'External Temperature',
      'type': 'number',
      'role': 'value.temperature',
      'unit': '°C',
      'read': true,
      'write': false
    }
  },
  'ext.temperatureC3': {
    coap: {
      coap_publish: '3301', // CoAP >= FW 1.8
      //coap_publish_funct: (value) => { return value; }
    },
    mqtt: {
      mqtt_publish: 'shellies/shelly1pm-<deviceid>/ext_temperature/2',
      mqtt_publish_funct: (value) => { return String(value).replace(/[^0-9\.]/g, ''); }
    },
    common: {
      'name': 'External Temperature',
      'type': 'number',
      'role': 'value.temperature',
      'unit': '°C',
      'read': true,
      'write': false
    }
  },
  'ext.temperatureC4': {
    coap: {
      no_display: true // CoAP >= 1.8
    },
    mqtt: {
      mqtt_publish: 'shellies/shelly1pm-<deviceid>/ext_temperature/3',
      mqtt_publish_funct: (value) => { return String(value).replace(/[^0-9\.]/g, ''); }
    },
    common: {
      'name': 'External Temperature',
      'type': 'number',
      'role': 'value.temperature',
      'unit': '°C',
      'read': true,
      'write': false
    }
  },
  'ext.temperatureF1': {
    coap: {
      coap_publish: '3102', // CoAP >= FW 1.8
      //coap_publish_funct: (value) => { return value; }
    },
    mqtt: {
      mqtt_publish: 'shellies/shelly1pm-<deviceid>/ext_temperature_f/0',
      mqtt_publish_funct: (value) => { return String(value).replace(/[^0-9\.]/g, ''); }
    },
    common: {
      'name': 'External Temperature',
      'type': 'number',
      'role': 'value.temperature',
      'unit': '°F',
      'read': true,
      'write': false
    }
  },
  'ext.temperatureF2': {
    coap: {
      coap_publish: '3202', // CoAP >= FW 1.8
      //coap_publish_funct: (value) => { return value; }
    },
    mqtt: {
      mqtt_publish: 'shellies/shelly1pm-<deviceid>/ext_temperature_f/1',
      mqtt_publish_funct: (value) => { return String(value).replace(/[^0-9\.]/g, ''); }
    },
    common: {
      'name': 'External Temperature',
      'type': 'number',
      'role': 'value.temperature',
      'unit': '°F',
      'read': true,
      'write': false
    }
  },
  'ext.temperatureF3': {
    coap: {
      coap_publish: '3302', // CoAP >= FW 1.8
      //coap_publish_funct: (value) => { return value; }
    },
    mqtt: {
      mqtt_publish: 'shellies/shelly1pm-<deviceid>/ext_temperature_f/2',
      mqtt_publish_funct: (value) => { return String(value).replace(/[^0-9\.]/g, ''); }
    },
    common: {
      'name': 'External Temperature',
      'type': 'number',
      'role': 'value.temperature',
      'unit': '°F',
      'read': true,
      'write': false
    }
  },
  'ext.temperatureF4': {
    coap: {
      no_display: true // CoAP >= 1.8
    },
    mqtt: {
      mqtt_publish: 'shellies/shelly1pm-<deviceid>/ext_temperature_f/3',
      mqtt_publish_funct: (value) => { return String(value).replace(/[^0-9\.]/g, ''); }
    },
    common: {
      'name': 'External Temperature',
      'type': 'number',
      'role': 'value.temperature',
      'unit': '°F',
      'read': true,
      'write': false
    }
  },
  'ext.humidity1': {
    coap: {
      coap_publish: '3103', // CoAP >= FW 1.8
      //coap_publish_funct: (value) => { return value; }
    },
    mqtt: {
      mqtt_publish: 'shellies/shelly1pm-<deviceid>/ext_humidity/0',
      mqtt_publish_funct: (value) => { return String(value).replace(/[^0-9\.]/g, ''); }
    },
    common: {
      'name': 'External Humidity',
      'type': 'number',
      'role': 'value.humidity',
      'read': true,
      'write': false,
      'min': 0,
      'max': 100,
      'unit': '%'
    }
  },
  'ext.humidity2': {
    coap: {
      no_display: true // CoAP >= 1.8
    },
    mqtt: {
      mqtt_publish: 'shellies/shelly1pm-<deviceid>/ext_humidity/1',
      mqtt_publish_funct: (value) => { return String(value).replace(/[^0-9\.]/g, ''); }
    },
    common: {
      'name': 'External Humidity',
      'type': 'number',
      'role': 'value.humidity',
      'read': true,
      'write': false,
      'min': 0,
      'max': 100,
      'unit': '%'
    }
  },
  'ext.humidity3': {
    coap: {
      no_display: true // CoAP >= 1.8
    },
    mqtt: {
      mqtt_publish: 'shellies/shelly1pm-<deviceid>/ext_humidity/2',
      mqtt_publish_funct: (value) => { return String(value).replace(/[^0-9\.]/g, ''); }
    },
    common: {
      'name': 'External Humidity',
      'type': 'number',
      'role': 'value.humidity',
      'read': true,
      'write': false,
      'min': 0,
      'max': 100,
      'unit': '%'
    }
  },
  'ext.humidity4': {
    coap: {
      no_display: true // CoAP >= 1.8
    },
    mqtt: {
      mqtt_publish: 'shellies/shelly1pm-<deviceid>/ext_humidity/3',
      mqtt_publish_funct: (value) => { return String(value).replace(/[^0-9\.]/g, ''); }
    },
    common: {
      'name': 'External Humidity',
      'type': 'number',
      'role': 'value.humidity',
      'read': true,
      'write': false,
      'min': 0,
      'max': 100,
      'unit': '%'
    }
  }
};

module.exports = {
  shelly1pm: shelly1pm
};
