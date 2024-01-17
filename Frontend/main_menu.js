// appHomePage.js
var myObject = new Vue({
  el: '#app',
  data: {
    radios: [
      { label: 'Account Info', url: 'Account.html' },
      { label: 'Entry NCR', url: 'NCR_Form.html' },
      { label: 'Entry IOR', url: 'IOR_Form.html' },
      { label: 'DOA Project', url: 'doaProject.html' },
      { label: 'Searching NCR', url: 'searchingNCR.html' },
      { label: 'Searching IOT', url: 'halaman-search-iot.html' },
      { label: 'Certification Plan', url: 'halaman-certification.html' },
      { label: 'Report NCR', url: 'halaman-report-ncr.html' },
      { label: 'Report IOR', url: 'halaman-report-ior.html' }
    ],
    selectedRadio: 0
  },
  methods: {
    movePage() {
      // Mendapatkan label terpilih
      const selectedLabel = this.radios[this.selectedRadio].label;

      // Mengecek apakah label terpilih ada di dalam objek radios
      const selectedRadioObject = this.radios.find(radio => radio.label === selectedLabel);

      if (selectedRadioObject) {
        // Jika ditemukan, mengarahkan ke URL yang sesuai
        window.location.href = selectedRadioObject.url;
      } else {
        alert('Submit tidak diizinkan untuk opsi ini.');
      }
    }
  }
});
