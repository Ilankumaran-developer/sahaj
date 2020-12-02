const assert = require('assert'),
  sinon = require('sinon'),
  _ = require('lodash'),
  enums = require('../lib/common/enum.json'),
  data1 = require('./data/hotel-input1.json'),
  data2 = require('./data/hotel-input2.json'),
  output1 = require('./data/hotel-output1.json'),
  output2 = require('./data/hotel-output2.json');
const expect = require('chai').expect;


describe('HotelService', () => {
  const HotelService = require('../lib/service/hotel-service');
  let hotelService = new HotelService({});

  it('creates hotel 1', (done) => {

    let hotelInput = _.cloneDeep(data1.buildHotel);
    let res = {}, result;
    res.send = function (output) {
      result = output;
    }
    hotelService.process({ "body": hotelInput }, res, enums.methods.BUILD);
    expect(JSON.stringify(result)).to.equal(JSON.stringify(output1.hotel_output))
    done()

  });


  it('creates hotel 2', (done) => {

    let hotelInput = _.cloneDeep(data2.buildHotel);
    let res = {}, result;
    res.send = function (output) {
      result = output;
    }
    hotelService.process({ "body": hotelInput }, res, enums.methods.BUILD);
    expect(JSON.stringify(result)).to.equal(JSON.stringify(output2.hotel_output))
    done()

  });
})

describe('HotelService - processing sensor data', () => {
  const HotelService = require('../lib/service/hotel-service');
  let hotelService = new HotelService({});

  it('hotel 1 - sensor data with corridor 2 movement ON signal', (done) => {

    let hotelInput = _.cloneDeep(data1.buildHotel), sensorInput1 = _.cloneDeep(data1.sensor_input_corr_2_on);
    let res = {}, result;
    res.send = function (output) {
      result = output;
    }
    hotelService.process({ "body": hotelInput }, res, enums.methods.BUILD);
    hotelService.process({ "body": sensorInput1 }, res, enums.methods.PROCESSSENSORINPUT);
    expect(JSON.stringify(result)).to.equal(JSON.stringify(output1.sensor_output_corr_2_on))
    done()

  });

  it('hotel 1 - sensor data with corridor 2 movement OFF signal', (done) => {

    let sensorInput1 = _.cloneDeep(data1.sensor_input_corr_2_off);
    let res = {}, result;
    res.send = function (output) {
      result = output;
    }
    hotelService.process({ "body": sensorInput1 }, res, enums.methods.PROCESSSENSORINPUT);
    expect(JSON.stringify(result)).to.equal(JSON.stringify(output1.sensor_output_corr_2_off))
    done()

  });


  it('hotel 2 - sensor data with corridor 1 movement ON signal', (done) => {

    let hotelInput = _.cloneDeep(data2.buildHotel), sensorInput = _.cloneDeep(data2.sensor_input_corr_1_on);
    let res = {}, result;
    res.send = function (output) {
      result = output;
    }
    hotelService.process({ "body": hotelInput }, res, enums.methods.BUILD);
    hotelService.process({ "body": sensorInput }, res, enums.methods.PROCESSSENSORINPUT);
    expect(JSON.stringify(result)).to.equal(JSON.stringify(output2.sensor_output_corr_1_on))
    done()

  });


  it('hotel 2 - sensor data with corridor 2 movement ON signal', (done) => {

    let sensorInput = _.cloneDeep(data2.sensor_input_corr_2_on);
    let res = {}, result;
    res.send = function (output) {
      result = output;
    }
    hotelService.process({ "body": sensorInput }, res, enums.methods.PROCESSSENSORINPUT);
    expect(JSON.stringify(result)).to.equal(JSON.stringify(output2.sensor_output_corr_2_on))
    done()

  });



  it('hotel 2 - sensor data with corridor 3 movement ON signal', (done) => {

    let  sensorInput = _.cloneDeep(data2.sensor_input_corr_3_on);
    let res = {}, result;
    res.send = function (output) {
      result = output;
    }
    hotelService.process({ "body": sensorInput }, res, enums.methods.PROCESSSENSORINPUT);
    expect(JSON.stringify(result)).to.equal(JSON.stringify(output2.sensor_output_corr_3_on))
    done()

  });


  it('hotel 2 - sensor data with corridor 3 movement OFF signal', (done) => {

    let sensorInput = _.cloneDeep(data2.sensor_input_corr_3_off);
    let res = {}, result;
    res.send = function (output) {
      result = output;
    }
    hotelService.process({ "body": sensorInput }, res, enums.methods.PROCESSSENSORINPUT);
    expect(JSON.stringify(result)).to.equal(JSON.stringify(output2.sensor_output_corr_3_off))
    done()

  });
})