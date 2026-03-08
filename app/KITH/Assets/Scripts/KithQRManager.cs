using UnityEngine;
using UnityEngine.SceneManagement;

public class KithQRManager : MonoBehaviour
{
    [Header("UI References")]
    public GameObject scannerOverlay; // The square frame in your layout
    public GameObject loadingIcon;    // A small spinner if you have one

    // 1. Start the camera/scan
    public void StartQRScan()
    {
        Debug.Log("Accessing Camera for QR Scan...");
        if(scannerOverlay != null) scannerOverlay.SetActive(true);
        
        // Simulating the time it takes to "find" the QR code
        Invoke("OnScanSuccess", 1.5f); 
    }

    // 2. Logic when QR is successfully read
    void OnScanSuccess()
    {
        Debug.Log("Patient Linked Successfully!");
        
        // Save that we are logged in
        PlayerPrefs.SetInt("IsPaired", 1);
        
        // Move to Caretaker Dashboard
        SceneManager.LoadScene("21_Caretake...");
    }

    // 3. For the "Enter Code Manually" option in your layout
    public void OpenManualEntry()
    {
        Debug.Log("Opening Manual Entry Popup...");
    }
}
