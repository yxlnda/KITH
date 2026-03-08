using UnityEngine;
using UnityEngine.SceneManagement;

public class KithQRScanner : MonoBehaviour
{
    [Header("UI Overlay")]
    public GameObject scannerFrame; // The square box in your layout

    public void StartScanning()
    {
        Debug.Log("Opening Camera... Scanning for Patient QR");
        // Simulate scanning for 2 seconds
        Invoke("OnScanComplete", 2.0f);
    }

    void OnScanComplete()
    {
        Debug.Log("Pairing Successful! Connection established.");
        // Move to the Caretaker Dashboard
        SceneManager.LoadScene("21_Caretake...");
    }

    public void UseManualCode()
    {
        Debug.Log("Switching to manual text input.");
    }
}