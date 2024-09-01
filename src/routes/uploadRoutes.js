const express = require('express');
const router = express.Router();
const xlsx = require('xlsx');
const multer = require('multer');
const eventUseCases = require('../usecases/eventUseCases');
const authenticateToken = require('../middleware/authMiddleware');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload-excel', authenticateToken, upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: 'No se subió archivo' });
        }

        const workbook = xlsx.read(file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(worksheet);

        await Promise.all(
            jsonData.map(eventData => eventUseCases.createOrUpdateEvent(eventData))
        );

        res.status(200).json({ message: 'Archivo procesado' });
    } catch (error) {
        console.error('Error procesando archivo:', error);
        res.status(500).json({ error: 'Error procesando archivo' });
    }
});

module.exports = router;
