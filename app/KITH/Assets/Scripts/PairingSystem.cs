using UnityEngine;
using UnityEngine.SceneManagement; // This is required to change scenes

public class PairingSystem : MonoBehaviour
{
    
    [Header("UI Settings")]
    public GameObject scannerOverlay; 

    // This handles the QR Scan button
    public void OnClickScan()
    {
        Debug.Log("CLAY Pairing System: Scanning...");
        // This simulates finding the QR code
        Invoke("CompletePairing", 1.5f);
    }

    void CompletePairing()
    {
        Debug.Log("Pairing Successful!");
        
        // Save pairing status so the app remembers the connection
        PlayerPrefs.SetInt("HasPaired", 1);
        PlayerPrefs.Save();
        
        SceneManager.LoadScene("21_Caretake..."); 
    }

    public void DisconnectPatient()
    {
        PlayerPrefs.DeleteKey("HasPaired");
        // Goes back to the start
        SceneManager.LoadScene("01_ModeSel");
    }
}
