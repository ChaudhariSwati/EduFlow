import mongoose from 'mongoose'

const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    driveLink: { type: String, default: '' },
    dueDate: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    submissions: {
      type: Map,
      of: Boolean,
      default: {},
    },
  },
  { timestamps: true }
)

assignmentSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  flattenMaps: true,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    ret.createdBy = ret.createdBy?.toString()
    delete ret._id
    return ret
  },
})

export default mongoose.model('Assignment', assignmentSchema)