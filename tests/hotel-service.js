const assert = require('assert'),
sinon = require('sinon'),
_ = require('lodash'),
enums = require('../lib/common/enum.json'),
data1 = require('./data/hotel-input.json'),
data2 = require('./data/hotel-input2.json'),
output1 = require('./data/hotel-output1.json'),
sensoroutput1 = require('./data/sensor-output1.json'),
sensoroutput2 = require('./data/sensor-output2.json'),
output2 = require('./data/hotel-output2.json');
const  expect=require('chai').expect;


describe('HotelService - building hotel', () => {
    const HotelService = require('../lib/service/hotel-service');
    let hotelService = new HotelService({});

    it('creates hotel 1', (done) => {

          let hotelInput = _.cloneDeep(data1.buildHotel);
          let res = {}, result;
          res.send = function(output){
            result = output;
          }
          hotelService.process({"body":hotelInput}, res, enums.methods.BUILD);
          expect(JSON.stringify(result)).to.equal(JSON.stringify(output1))
          done()
    
      });


      it('creates hotel 2', (done) => {

        let hotelInput = _.cloneDeep(data2.buildHotel);
        let res = {}, result;
        res.send = function(output){
          result = output;
        }
        hotelService.process({"body":hotelInput}, res, enums.methods.BUILD);
        expect(JSON.stringify(result)).to.equal(JSON.stringify(output2))
        done()
  
    });
})

describe('HotelService - processing sensor data', () => {
  const HotelService = require('../lib/service/hotel-service');
  let hotelService = new HotelService({});

  it('creates hotel 1 - sensor 1 data', (done) => {

        let hotelInput = _.cloneDeep(data1.buildHotel), sensorInput1 = _.cloneDeep(data1.sensorInput1);
        let res = {}, result;
        res.send = function(output){
          result = output;
        }
        hotelService.process({"body":hotelInput}, res, enums.methods.BUILD);
        hotelService.process({"body":sensorInput1}, res, enums.methods.PROCESSSENSORINPUT);
        expect(JSON.stringify(result)).to.equal(JSON.stringify(sensoroutput1))
        done()
  
    });


    it('creates hotel 2 - sensor 1 data', (done) => {

      let hotelInput = _.cloneDeep(data1.buildHotel),  sensorInput1 = _.cloneDeep(data1.sensorInput1), sensorInput2 = _.cloneDeep(data1.sensorInput2);
      let res = {}, result;
      res.send = function(output){
        result = output;
      }
      hotelService.process({"body":hotelInput}, res, enums.methods.BUILD);
      hotelService.process({"body":sensorInput1}, res, enums.methods.PROCESSSENSORINPUT);
      hotelService.process({"body":sensorInput2}, res, enums.methods.PROCESSSENSORINPUT);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(sensoroutput2))
      done()

  });
})