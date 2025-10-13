<template>
  <div class="min-h-screen bg-gray-900 flex flex-col items-center p-4 sm:p-8 font-inter text-white">
    
    <!-- HEADER -->
    <header class="w-full max-w-xl text-center mb-12 px-2">
      <h1 class="text-3xl sm:text-4xl font-extrabold text-indigo-400 mb-2">Barcode Utility</h1>
      <p class="text-gray-400 text-sm sm:text-base">Simple tools for label creation and single-frame barcode capture.</p>
    </header>

    <!-- MAIN CARD -->
    <div class="w-full max-w-xl sm:max-w-2xl bg-gray-800 shadow-2xl rounded-xl p-4 sm:p-8 space-y-6 sm:space-y-8">
      
      <!-- 1. GENERATE & PRINT SECTION -->
      <section class="border-b border-gray-700 pb-6">
        <h2 class="text-xl font-bold text-indigo-300 mb-4">1. Generate & Print Label</h2>
        
        <div class="p-4 bg-gray-700 rounded-lg mb-6 flex flex-col items-center border border-indigo-500/50 w-full">
          <svg id="barcode-display" class="w-full h-20 bg-white p-2 rounded-md"></svg>
          <p class="text-xs sm:text-sm text-gray-400 mt-2 font-mono break-words">{{ barcodeValue || 'New Barcode ID' }}</p>
        </div>

        <button
          @click="generateAndPrint"
          :disabled="generating"
          class="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500 disabled:bg-indigo-800 transition duration-150 ease-in-out flex items-center justify-center text-base sm:text-lg"
        >
          <svg v-if="generating" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ generating ? 'Processing...' : 'Generate New Barcode & Print' }}
        </button>

        <p v-if="saveMessage" :class="['mt-3 text-sm text-center', saveSuccess ? 'text-green-400' : 'text-red-400']">
          {{ saveMessage }}
        </p>
      </section>

      <!-- 2. SCANNER SECTION -->
      <section>
        <h2 class="text-xl font-bold text-green-400 mb-4">2. Test Capture Scanner</h2>
        
        <button
          @click="openScannerModal"
          class="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-500 transition duration-150 ease-in-out flex items-center justify-center text-base sm:text-lg mb-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="13 17 18 17 18 10 13 10"></polyline>
            <path d="M12 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7"></path>
            <line x1="12" y1="17" x2="12" y2="21"></line>
            <line x1="12" y1="10" x2="12" y2="14"></line>
          </svg>
          Open Barcode Scanner
        </button>

        <div class="p-4 bg-gray-700 rounded-lg border-2" :class="{'border-green-400': scanSuccess, 'border-red-400': scanMessage && !scanSuccess, 'border-gray-500': !scanMessage}">
          <h3 class="font-semibold text-gray-200 mb-1">Last Scan Result:</h3>
          <p v-if="scannedCode" class="text-lg sm:text-xl font-mono break-words text-white">{{ scannedCode }}</p>
          <p v-else class="text-xs sm:text-sm text-gray-400">No scan attempted yet.</p>

          <p v-if="scanMessage" :class="['mt-2 text-sm font-medium', scanSuccess ? 'text-green-400' : 'text-red-400']">
            {{ scanMessage }}
          </p>
        </div>
      </section>
    </div>

    <!-- SCANNER MODAL -->
    <div v-if="showScanModal" class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div class="bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-700">
        <div class="bg-indigo-600 text-white p-4 text-center text-xl font-bold flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="20" x2="12" y2="12"></line><line x1="8" y1="20" x2="8" y2="12"></line><line x1="16" y1="20" x2="16" y2="12"></line></svg>
          Scan Barcode
        </div>
        
        <div class="p-6">
          <p class="text-center text-gray-300 mb-4">{{ scanStatusMessage }}</p>

          <div id="scanner-container" class="relative w-full aspect-video sm:aspect-[4/3] bg-black rounded-lg overflow-hidden mb-4">
            <video id="scanner-video" class="w-full h-full object-cover"></video>
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div class="w-4/5 sm:w-3/4 h-1/4 border-2 border-dashed border-yellow-400 rounded-lg"></div>
            </div>
            <canvas id="scanner-canvas" class="hidden"></canvas>
          </div>

          <div class="flex flex-col sm:flex-row justify-between gap-3">
            <button
              @click="closeScannerModal"
              class="flex-1 py-3 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 transition duration-150 ease-in-out flex items-center justify-center mb-2 sm:mb-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel Scanning
            </button>
            <button
              @click="captureAndScan"
              :disabled="!isScanningReady"
              class="flex-1 py-3 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-500 disabled:bg-green-800 transition duration-150 ease-in-out flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.218A2 2 0 0110.69 4h2.62a2 2 0 011.664.89l.812 1.218A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Capture Barcode
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue';
import JsBarcode from 'jsbarcode';
import { BrowserMultiFormatReader } from '@zxing/library';
import { supabase } from './server/supabase';

export default {
  name: 'BarcodeApp',
  setup() {
    const barcodeValue = ref('');
    const scannedCode = ref(null);
    const showScanModal = ref(false);
    const scanStatusMessage = ref('Awaiting camera initialization...');
    const generating = ref(false); 
    const saveMessage = ref('');
    const saveSuccess = ref(false);
    const isScanningReady = ref(false); 
    const scanSuccess = ref(false);
    const scanMessage = ref('');

    let _scannerStream = null;
    let _zxingReader = new BrowserMultiFormatReader(); 

    const generateNewCode = () => {
      let code = '';
      for (let i = 0; i < 12; i++) code += Math.floor(Math.random() * 10);
      return code;
    };

    const generateBarcodeSVG = (code) => {
      nextTick(() => {
        const svgElement = document.getElementById('barcode-display');
        if (svgElement) JsBarcode(svgElement, code, { format: 'EAN13', displayValue: true, height: 50, width: 2, margin: 5, textMargin: 0 });
      });
    };

    const printBarcode = () => {
      const codeToPrint = barcodeValue.value;
      if (!codeToPrint || codeToPrint.length < 12) return;

      const printWindow = window.open('', '_blank');
      printWindow.document.write('<html><head><title>Barcode Label</title><style>@media print {@page{margin:0.1in}body{text-align:center;font-family:sans-serif}.label{page-break-after:always;width:2.5in;height:1in;padding:5px;box-sizing:border-box;margin-bottom:5px}.product-name{font-size:8pt;font-weight:bold;margin:0 0 2px 0}svg{display:block;margin:0 auto;height:35px}.value{font-size:7pt;margin-top:2px}}</style></head><body>');
      printWindow.document.body.innerHTML += `<div class="label"><p class="product-name">ITEM ID</p><svg id="print-barcode"></svg><p class="value">${codeToPrint}</p></div>`;
      printWindow.document.close();
      printWindow.onload = () => { JsBarcode(printWindow.document.getElementById('print-barcode'), codeToPrint, { format:'EAN13', displayValue:true, height:35, width:1.5, margin:5 }); printWindow.focus(); printWindow.print(); };
    };

    const generateAndPrint = async () => {
      generating.value = true;
      saveMessage.value = '';
      const newBarcode = generateNewCode();
      try {
        const { error } = await supabase.from('products').insert([{ barcode_value: newBarcode, name: `Generated Product ${newBarcode}`, price: (Math.random()*100).toFixed(2) }]);
        if (error) throw error;
        barcodeValue.value = newBarcode; 
        generateBarcodeSVG(newBarcode);
        saveSuccess.value = true;
        saveMessage.value = `✅ Barcode created and saved: ${newBarcode}. Printing label...`;
        printBarcode(); 
      } catch (error) {
        saveSuccess.value = false;
        if (error.code === '23505') saveMessage.value = 'Error: Barcode collision detected. Try again.';
        else { console.error('Save/Print error:', error); saveMessage.value = 'Error: Failed to save to DB.'; }
      } finally {
        generating.value = false;
        setTimeout(() => saveMessage.value='', 5000);
      }
    };

    const startCameraStream = async () => {
      scanStatusMessage.value = 'Requesting camera permissions...';
      isScanningReady.value = false;
      const videoEl = document.getElementById('scanner-video');
      try {
        _scannerStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode:'environment', width:640, height:480 } });
        videoEl.srcObject = _scannerStream;
        await new Promise(resolve => { videoEl.onloadedmetadata = () => { videoEl.play().then(resolve).catch(()=>stopScanner()); }; });
        scanStatusMessage.value = 'Camera ready. Align barcode in the yellow box.';
        isScanningReady.value = true;
      } catch(err) { console.error(err); scanStatusMessage.value='Error starting camera: '+(err.message||'No camera found.'); stopScanner(); }
    };

    const captureAndScan = async () => {
      if (!isScanningReady.value) { scanStatusMessage.value='Error: Camera not ready.'; return; }
      scanStatusMessage.value='Capturing frame...';
      const videoEl = document.getElementById('scanner-video');
      const canvasEl = document.getElementById('scanner-canvas');
      canvasEl.width = videoEl.videoWidth; canvasEl.height = videoEl.videoHeight;
      const ctx = canvasEl.getContext('2d');
      ctx.drawImage(videoEl,0,0,canvasEl.width,canvasEl.height);
      stopScanner();
      try {
        const dataUrl = canvasEl.toDataURL('image/png');
        const result = await _zxingReader.decodeFromImageUrl(dataUrl);
        if(result?.text) onScannedCode(result.text);
        else { scannedCode.value=null; scanSuccess.value=false; scanMessage.value='⚠️ No barcode detected.'; scanStatusMessage.value='Scan complete.'; }
      } catch(err) { console.error(err); scannedCode.value=null; scanSuccess.value=false; scanMessage.value='⚠️ Failed to scan barcode.'; scanStatusMessage.value='Scan complete.'; }
    };

    const onScannedCode = (code) => {
      scannedCode.value = code;
      if(code === barcodeValue.value) { scanSuccess.value=true; scanMessage.value=`✅ SUCCESS: Scanned code matches!`; }
      else { scanSuccess.value=false; scanMessage.value=`⚠️ MISMATCH: Scanned (${code}) vs Current (${barcodeValue.value})`; }
      showScanModal.value=false;
    };

    const stopScanner = () => {
      isScanningReady.value=false;
      if(_scannerStream){ _scannerStream.getTracks().forEach(track=>track.stop()); _scannerStream=null; }
      scanStatusMessage.value='Scanner closed.';
    };

    const openScannerModal = () => {
      showScanModal.value = true; // first show the modal
      nextTick(() => {
        scanStatusMessage.value = 'Awaiting camera initialization...';
        scannedCode.value = null;
        saveMessage.value = '';
        scanMessage.value = '';
        startCameraStream();      // now the <video> element exists
      });
    };

    const closeScannerModal = () => { stopScanner(); showScanModal.value=false; };

    onMounted(() => { generateBarcodeSVG('123456789012'); });
    onBeforeUnmount(() => { stopScanner(); });

    return {
      barcodeValue, scannedCode, showScanModal, scanStatusMessage, generating, saveMessage, saveSuccess, isScanningReady, scanSuccess, scanMessage,
      generateAndPrint, openScannerModal, closeScannerModal, captureAndScan
    };
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
.font-inter { font-family: 'Inter', sans-serif; }
</style>
