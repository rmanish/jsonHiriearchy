'use strict';
import boom from 'boom';
import response from '@helpers/responseHelper';
import resCode from '@appconstants/responseCode.json';
import statusCode from '@appconstants/statusCode.json';
import {input} from '../dummy/input';
import axios from "axios";

export default class hirearchy {

/**
 * 
 * @param {array} array 
 * @returns {object}
 */
async convertToHiriearchy (array){
    let map = {}
    for(let i = 0; i < array.length; i++){
        let obj = array[i]
        if(!(obj.id in map)){
            map[obj.id] = obj
            map[obj.id].children = []
        }

        let parent_id = obj.parent_id || '-';
        if(!(parent_id in map)){
            map[parent_id] = {}
            map[parent_id].children = []
        }

        map[parent_id].children.push(map[obj.id])
    }
    return map['-']
}


 /**
  * This fucntion call to maitain the hirearchy
  * @param {object} option 
  * @returns {object} response 
  */
  async find (option = {}) {
    try {
        let combinedArray=[]
        /*** start combined all array */
        for (const key of Object.keys(input)) {
            console.log(key, input[key]);
            combinedArray=[ ...combinedArray, ...input[key]]
        }
        /** end */

        let result = await this.convertToHiriearchy(combinedArray);
        return response.successHandler(statusCode.OK, resCode.OK, result['children'][0]);
    } catch (err) {
      return boom.serverUnavailable(resCode.DB_ERROR, err);
    }
  }

  async getGitRepo(obj){
    try {
        let result = await this.gitcall(obj.q,obj.page,obj.perPage);
        return response.successHandler(statusCode.OK, resCode.OK, result.data);
    } catch (err) {
      return boom.serverUnavailable(resCode.DB_ERROR, err);
    }

  }
  async gitcall(q,page,perPage){
    let hitUrl= `https://api.github.com/search/repositories?q=${q}&order=desc&page=${page}&per_page=${perPage}`
    console.log(hitUrl);
    let resp = await axios({
        url: hitUrl,
        method: 'get',
        headers:''
        });
    return resp;    

  }
  
 
}


