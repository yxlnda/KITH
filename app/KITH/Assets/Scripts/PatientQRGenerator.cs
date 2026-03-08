using UnityEngine;
using TMPro;

public class PatientQRGenerator : MonoBehaviour
{
    public TextMeshProUGUI qrStatusText;

    void Start()
    {
        // When the patient opens this scene, show their status
        qrStatusText.text = "Show this code to your caretaker";
    }

    public void RefreshCode()
    {
        Debug.Log("Generating new pairing code...");
    }
}
