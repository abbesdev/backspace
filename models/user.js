const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create user schema
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  profilePhoto: String,
  email: String,
  password: String,
  registrationCode: String,
  dateOfBirth: Date,
  userRole: String, // discriminator key value
  verified: {
    type: Boolean,
    default: false
  }

},
  {
    timestamps: true
  },
  {
    discriminatorKey: 'userRole'
  }
);

// Create teacher schema that inherits from user schema
const teacherSchema = new Schema({
  subject: {
    type: Schema.Types.ObjectId,
    ref: 'Subject'
  },

});

// Create student schema that inherits from user schema
const studentSchema = new Schema({
  identifiant: String,
  class: {
    type: Schema.Types.ObjectId,
    ref: 'Class'
  },
});

// Create parent schema that inherits from user schema
const parentSchema = new Schema({
  child: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
});

// Create admin schema that inherits from user schema
const adminSchema = new Schema({});

// Create models
const User = mongoose.model('User', userSchema);
const Teacher = User.discriminator('Teacher', teacherSchema);
const Student = User.discriminator('Student', studentSchema);
const Parent = User.discriminator('Parent', parentSchema);
const Admin = User.discriminator('Admin', adminSchema);

// Export models
module.exports = { User, Teacher, Student, Parent, Admin };
