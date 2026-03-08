using UnityEngine;
using UnityEngine.SceneManagement;

public class QRScannerLogic : MonoBehaviour
{
    public GameObject scannerOverlay; // The square UI frame

    public void OnClickScan()
    {
        Debug.Log("Camera Active: Searching for Patient QR...");
        // Simulate a successful scan after 1.5 seconds
        Invoke("CompletePairing", 1.5f);
    }

    void CompletePairing()
    {
        Debug.Log("Pairing Successful!");
        // Save the pairing status
        PlayerPrefs.SetInt("HasPaired", 1);
        
        // Go to Caretaker Home
        SceneManager.LoadScene("21_Caretake...");
    }

    public void OpenManualEntry()
    {
        // Logic for "Masuk kod manual" if the camera fails
        Debug.Log("Opening Manual Entry Field");
    }
}
