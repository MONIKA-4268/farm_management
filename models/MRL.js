const mongoose = require('mongoose');

const mrlSchema = new mongoose.Schema({
  chemical: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Chemical', 
    required: true 
  },
  species: { 
    type: String, 
    required: true 
  },
  maxResidueLimit: { 
    type: Number, 
    required: true 
  },
  regulatorySource: { 
    type: String 
  },
  effectiveDate: { 
    type: Date 
  },
  expiryDate: { 
    type: Date 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  // Optional fields for compliance/audit trace
  cow: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Cow' 
  },
  enteredDosage: { 
    type: Number 
  },
  milkYieldStatus: { 
    type: String, 
    enum: ['Yes', 'No', 'Unknown'] 
  },
  warning: { 
    type: String 
  }
});

module.exports = mongoose.model('MRL', mrlSchema);