<template>
  <el-dialog title="流程数据信息" :visible.sync="dialogVisible" width="70%">
    <el-alert
      v-show="origin"
      title="使用说明"
      type="warning"
      description="以下流程信息可以被存储起来，方便下一次流程加载"
      show-icon
      close-text="知道了"
    >
    </el-alert>
    <br />
    <!--一个高亮显示的插件-->
    <codemirror
      :value="flowJsonData"
      :options="options"
      class="code"
    ></codemirror>
  </el-dialog>
</template>

<script>
import "codemirror/lib/codemirror.css";
import { codemirror } from "vue-codemirror";
import nodeVue from "./node.vue";

require("codemirror/mode/javascript/javascript.js");

export default {
  props: {
    data: Object,
  },
  data() {
    return {
      dialogVisible: false,
      flowJsonData: {},
      options: {
        mode: { name: "javascript", json: true },
        lineNumbers: true,
      },
      origin: true,
    };
  },
  components: {
    codemirror,
  },
  methods: {
    init(origin) {
      this.dialogVisible = true;
      this.origin = origin;

      //前端源数据
      if (origin) {
        this.flowJsonData = JSON.stringify(this.data, null, 4).toString();
      }
      //后端数据
      else {
        this.flowJsonData = JSON.stringify(
          this.genBackEndData(),
          null,
          4
        ).toString();
      }

      console.log(this.origin);
      //   var showData = {
      //       showJson:this.data,
      //       modelInfo:this.genBackEndData()
      //   }
      //   this.flowJsonData=JSON.stringify(showData, null, 4).toString()
    },

    genBackEndData() {
      var nodeList = this.data.nodeList;
      var lineList = this.data.lineList;
      var nodeInLineDict = {};
      var nodeOutLineDict = {};
      var nodes = [];
      var lines = [];
      var gateways = [];

      for (var i = 0; i < lineList.length; i++) {
        var line = lineList[i];
        var fromId = line.from;
        var toId = line.to;
        var lineId = line.id;
        lines.push({
          id: lineId,
          name: line.name,
          pid: fromId,
          sid: toId,
          exclusiveOrder: 0,
          flowConditionExpression: null,
        });
        if (toId in nodeInLineDict) {
          nodeInLineDict[toId].push(lineId);
        } else {
          nodeInLineDict[toId] = [lineId];
        }
        if (fromId in nodeOutLineDict) {
          nodeOutLineDict[fromId].push(lineId);
        } else {
          nodeOutLineDict[fromId] = [lineId];
        }
      }

      for (var j = 0; j < nodeList.length; j++) {
        var i = nodeList[j];
        console.log(i);
        if (i.gateway) {
          var gateway = {
            id: i.id,
            name: i.name,
            type: i.type,
            top: i.top,
            left: i.left,
            ico: i.ico,
            pids: nodeInLineDict[i.id],
            sids: nodeOutLineDict[i.id],
          };
          gateways.push(gateway);
        } else {
          var node = {
            id: i.id,
            name: i.name,
            type: i.type,
            top: i.top,
            left: i.left,
            ico: i.ico,
            pids:
              i.id in nodeInLineDict
                ? nodeInLineDict[i.id].length > 0
                  ? nodeInLineDict[i.id][0]
                  : null
                : null,
            sids:
              i.id in nodeOutLineDict
                ? nodeOutLineDict[i.id].length > 0
                  ? nodeOutLineDict[i.id][0]
                  : null
                : null,
          };
          nodes.push(node);
        }
      }
      var modelInfo = { nodes: nodes, lines: lines, gateways: gateways };
      //   console.log(modelInfo);
      return modelInfo;
    },
  },
};
</script>
