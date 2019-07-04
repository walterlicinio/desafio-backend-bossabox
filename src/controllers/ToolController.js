const ToolModel = require('../models/ToolModel')

class ToolController {
  async GET_TOOLS (req, res) {
    if (Object.entries(req.query).length === 0) {
      res.send(await ToolModel.find({}, {
        _id: 0,
        __v: 0
      }))
    } else {
      res.send(await ToolModel.find({
        tags: req.query.tag
      }, {
        _id: 0,
        __v: 0
      }))
    }
  }

  async STORE_TOOL (req, res) {
    const lastEntry = await ToolModel.find({}).sort({
      _id: -1
    }).limit(1)

    const newTool = await ToolModel.create({
      ...req.body,
      id: lastEntry[0].id + 1
    })

    const toolJsonReturn = await ToolModel.findOne({
      id: newTool.id
    }, {
      _id: 0,
      __v: 0
    })

    return res.json(toolJsonReturn)
  }

  async DELETE_TOOL (req, res) {
    await ToolModel.deleteOne({
      id: req.params.id
    })
    return res.status(200).json({})
  }
}

module.exports = new ToolController()
